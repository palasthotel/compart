<div data-compart-user-proposal-component>
<?php

if ( is_user_logged_in() ) {
	?>
    <form>
        <label>Proposal<br/>
            <textarea name="compart_proposal" rows="5"></textarea>
            <button>Submit</button>
        </label>
    </form>
    <div data-compart-proposal-success>
        <textarea readonly data-compart-proposal-preview rows="5"></textarea>
        <p>Thanks for your input!</p>
    </div>
    <div data-compart-proposal-error>
        <p>Sorry, something went wrong...</p>
    </div>
	<?php
} else {
	echo "<p>Please login.</p>";
}
?>
</div>
