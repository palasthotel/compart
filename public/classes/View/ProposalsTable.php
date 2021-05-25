<?php


namespace Palasthotel\WordPress\CommunityParticipation\View;


use Palasthotel\WordPress\CommunityParticipation\Data\Database;
use Palasthotel\WordPress\CommunityParticipation\Model\Proposal;
use Palasthotel\WordPress\CommunityParticipation\Model\ProposalQueryArgs;
use Palasthotel\WordPress\CommunityParticipation\Utils\Validation;

class ProposalsTable extends \WP_List_Table {

	/**
	 * @var Database
	 */
	private $database;

	public function __construct( Database $database ) {
		parent::__construct( [] );
		$this->database = $database;
	}

	public function get_columns() {
		return [
			"id"       => "ID",
			"proposal" => "Proposal",
			"status"   => "Status",
			"user_id"  => "User",
		];
	}

	/**
	 * @param Proposal $item
	 * @param string $column_name
	 */
	protected function column_default( $item, $column_name ) {
		switch ( $column_name ) {
			case "id":
				echo $item->id;
				break;
			case "proposal":
				echo "<textarea rows='3' style='width: 100%' readonly>";
				echo $item->text;
				echo "</textarea>";
				$adminUrl = admin_url("admin.php?page=".MenuProposals::SLUG."&proposal_id=$item->id");
				echo "<a href='$adminUrl'>Edit</a>";
				break;
			case "user_id":
				$user = get_userdata( $item->userId );
				if ( $user instanceof \WP_User ) {
					if ( ! isset( $_GET["user_id"] ) ) {
						$url = add_query_arg( [ "user_id" => $item->userId ] );
						echo "<a href='$url'>" . $user->display_name . "</a>";
					} else {
						echo $user->display_name;
					}
				} else {
					echo "Unknown id: $item->userId";
				}
				break;
			case "status":
				if ( ! isset( $_GET["status"] ) ) {
					$url = add_query_arg( [ "status" => $item->status ] );
					echo "<a href='$url'>$item->status</a>";
				} else {
					echo $item->status;
				}
				break;

		}
	}

	protected function get_sortable_columns() {
		return [
			'user_id' => [ 'user_id', 'asc' ],
			'status'  => [ 'status', 'asc' ],
		];
	}

	private function get_hidden_columns(){
		return ["id"];
	}

	public function prepare_items() {
		$args = new ProposalQueryArgs();

		if ( isset( $_GET["status"] ) && Validation::isValidProposalState( $_GET["status"] ) ) {
			$args->status = $_GET["status"];
		}

		$items = $this->database->queryProposals( $args );
		$count = $this->database->countProposals( $args );

		$this->_column_headers = [
			$this->get_columns(),
			$this->get_hidden_columns(),
			$this->get_sortable_columns()
		];

		$this->set_pagination_args( [
			"total_items" => $count,
			"total_pages" => ceil( $count / 50 ),
			"per_page"    => 50,
		] );

		$this->items = $items;
	}

	protected function get_views() {
		$adminUrl       = admin_url( "/admin.php?page=" . MenuProposals::SLUG );
		$selectedStatus = $_GET["status"] ?? false;

		$args = new ProposalQueryArgs();
		$countAll = $this->database->countProposals($args);

		$views = [
			'all'     => $this->get_view_state("All", $countAll, $adminUrl, !$selectedStatus),
		];

		$items = [
			Proposal::STATUS_WAITING => "Waiting",
			Proposal::STATUS_ACCEPTED => "Accepted",
			Proposal::STATUS_REJECTED => "Rejected",
			Proposal::STATUS_FINISHED => "Finished",
		];

		foreach ( $items as $status => $label){
			$args = new ProposalQueryArgs();
			$args->status = $status;
			$count = $this->database->countProposals($args);
			$url = $adminUrl."&status=$status";
			$views[$status] = $this->get_view_state($label, $count, $url, $selectedStatus === $status);
		}

		return $views;
	}

	private function get_view_state($label, $count, $url, $isSelected){
		return "<a class='".($isSelected ? "current" : "")."' href='$url'>$label ($count)</a>";
	}
}