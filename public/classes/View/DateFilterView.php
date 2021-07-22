<?php


namespace Palasthotel\WordPress\CommunityParticipation\View;


class DateFilterView {

    public function getDate(): string {
        return isset($_GET["proposals-date"]) ? sanitize_text_field($_GET["proposals-date"]) : "";
    }

	public function display(){
		?>
		<div class="proposals__date-filter">
            <form>
                <?php
                foreach ($_GET as $key => $param){
                    echo "<input type='hidden' name='$key' value='$param' />";
                }
                ?>
                <input type="date" name="proposals-date" value="<?php echo $this->getDate(); ?>" />
                <button class="button button-secondary">Filter</button>
            </form>
		</div>
        <script>
            jQuery(($)=>{
                $(".proposals__date-filter").on("change", "input", function(e){
                   console.debug(this.value);
                });
            });
        </script>
		<?php
	}
}