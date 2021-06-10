jQuery(($) => {

    const api = Compart.api;

    const selectComponent = "[data-compart-user-proposal-form]";
    const selectSuccess = "[data-compart-proposal-success]";
    const selectError = "[data-compart-proposal-error]";

    $(`${selectSuccess}, ${selectError}`).hide();

    $("body").on("submit", `${selectComponent} form`, function (e) {
        e.preventDefault();
        const $form = $(this);
        const $component = $form.parent(selectComponent);

        if ($component.attr("data-is-submitting") === "true") return;

        const $proposal = $form.find("[name=compart_proposal]");
        const proposal = $proposal.val();

        if (typeof proposal !== "string" || proposal.length <= 0) {
            return;
        }

        $proposal.prop("disabled", true);
        $component.attr("data-is-submitting", "true");

        api.createProposal(proposal)
            .then(response => {
                $proposal.prop("disabled", false);
                $component.attr("data-is-submitting", "false");
                $proposal.val("");
                return response;
            }).then(onResult($component, proposal));
    });

    const onResult = ($component, proposal) => (response) => {
        $component.find("form").hide();
        if (!response.success) {
            $component.find(selectError).show();
            return;
        }
        const $success = $component.find(selectSuccess);
        $success.show();
        $success.find("[data-compart-proposal-preview]").val(proposal);
    }
});