document.addEventListener("DOMContentLoaded",() => {

    const api = Compart.api;

    const selectComponent = "[data-compart-user-proposal-component]";
    const selectSuccess = "[data-compart-proposal-success]";
    const selectError = "[data-compart-proposal-error]";
    const selectPreview = "[data-compart-proposal-preview]";

    const isSubmitting = (component, isSubmitting) => {
        if(typeof isSubmitting === "boolean"){
            if(isSubmitting){
                component.setAttribute("data-is-submitting", "true");
                document.body.classList.add("compart-user-proposal__is-submitting");
            } else {
                component.removeAttribute("data-is-submitting");
                document.body.classList.remove("compart-user-proposal__is-submitting");
            }
        }
        return component.getAttribute("data-is-submitting") === "true";
    }

    document.body.addEventListener("submit", function(e){

        const form = e.target;
        const component = form.closest(selectComponent);
        if(!component) return;
        e.preventDefault();

        if (isSubmitting(component)) return;

        const proposalField = form.querySelector("[name='compart_proposal']");
        const proposal = proposalField.value;

        if (typeof proposal !== "string" || proposal.length <= 0) {
            return;
        }

        proposalField.disabled = true;
        isSubmitting(component, true);

        api.createProposal(proposal)
            .then(response => {
                proposalField.removeAttribute("disabled");
                proposalField.value = "";
                isSubmitting(component, false);
                return response;
            }).then(onResult(component, proposal));


    });

    const onResult = (component, proposal) => (response) => {
        component.querySelector("form").style.display = "none";
        if (!response.success) {
            component.querySelector(selectError).style.display = "inherit";
            return;
        }
        component.querySelector(selectPreview).value = proposal;
        component.querySelector(selectSuccess).style.display = "inherit";
    }
});