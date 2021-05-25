import useSWR, {mutate} from "swr";
import {queryProposals, updateProposalStatus} from "../store/api";


export const useProposalsRequest = (page) => {
    const {data, error} = useSWR(
        [page],
        (page) => queryProposals({page})
    );

    return {
        result: data?.result ?? [],
        numberOfItems: data?.number_of_items ?? 0,
        isLoading: !error && !data,
        isError: error
    }
}

export const useUpdateProposalStateRequest = (id, state) => {



    updateProposalStatus(id, status);


}