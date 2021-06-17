jQuery(($) => {

    const api = Compart.api;

    const $body = $("body");
    const selectComponent = "[data-compart-user-proposal-component]";
    const selectSuccess = "[data-compart-proposal-success]";
    const selectError = "[data-compart-proposal-error]";
    const selectPreview = "[data-compart-proposal-preview]";

    const isSubmitting = ($component, isSubmitting) => {
        if(typeof isSubmitting === "boolean"){
            if(isSubmitting){
                $component.attr("data-is-submitting", "true");
                $body.addClass("compart-user-proposal__is-submitting");
            } else {
                $component.removeAttr("data-is-submitting");
                $body.removeClass("compart-user-proposal__is-submitting");
            }
        }
        return $component.attr("data-is-submitting") === "true";
    }

    $body.on("submit", `${selectComponent} form`, function (e) {
        e.preventDefault();
        const $form = $(this);
        const $component = $form.closest(selectComponent);

        if (isSubmitting($component)) return;

        const $proposal = $form.find("[name=compart_proposal]");
        const proposal = $proposal.val();

        if (typeof proposal !== "string" || proposal.length <= 0) {
            return;
        }

        $proposal.prop("disabled", true);
        isSubmitting($component, true);

        api.createProposal(proposal)
            .then(response => {
                $proposal.prop("disabled", false);
                $proposal.val("");
                isSubmitting($component, false);
                return response;
            }).then(onResult($component, proposal));
    });

    const onResult = ($component, proposal) => (response) => {
        console.debug("Compart", $component, $component.find("form"), response);
        $component.find("form").hide();
        if (!response.success) {
            console.debug("Compart", "no success", response)
            $component.find(selectError).show();
            return;
        }
        console.debug("Compart", "success", $component.find(selectPreview), $component.find(selectSuccess))
        $component.find(selectPreview).val(proposal);
        $component.find(selectSuccess).show();
    }
});