import {staffMutationResolver} from "./staff";

const Mutation = {
    test: () => {
        return "This is a mutation";
    },
    staff: staffMutationResolver,
}

export default Mutation;
