<?php


namespace Palasthotel\WordPress\CommunityParticipation\View;


use Palasthotel\WordPress\CommunityParticipation\Component\Component;

class PostsTable extends Component {
	public function onCreate() {
		add_action('init', function(){
			add_filter(
				"manage_".$this->plugin->postTypeVoting->getSlug()."_posts_columns" ,
				[$this, 'columns_voting']
			);
			add_action(
				'manage_'.$this->plugin->postTypeVoting->getSlug().'_posts_custom_column' ,
				array($this,'custom_voting_columns'),
				10,
				2
			);

		});
	}

	public function columns_voting($columns){


		return $columns;
	}


	public function custom_voting_columns($column, $post_id){

	}


}