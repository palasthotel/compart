<div data-compart-user-proposal-list-component>
<?php

if ( is_user_logged_in() ) {
	$proposals = compart_get_user_proposals();
	?>
    <div class="compart__user-proposals-list">
        <?php
        foreach ( $proposals as $proposal ) {
            $text = nl2br( $proposal->text );
            $dateformat = get_option('date_format');
            $timeFormat = get_option('time_format');
            $date = date_i18n($dateformat." ".$timeFormat, $proposal->modified);
            echo "<div style='border: 1px solid #efefef; margin-bottom: 10px; padding: 10px;'>";
            echo "<p><strong>$proposal->summary</strong> ($proposal->status) $date</p>";
            echo "<p>$text</p>";
            echo "</div>";
        }
        ?>
    </div>
	<?php
} else {
	echo "<p>Please login.</p>";
}
?>
</div>