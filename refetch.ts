let refetch = true;

export const needRefetch = () => refetch;
export const setRefetch = (newState: boolean) => {
    refetch = newState;
};
