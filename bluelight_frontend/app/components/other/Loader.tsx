import { selectLoadingState } from "@/store/loading/loadingSelectors";
import { useAppSelector } from "@/store/store";
import { MoonLoader } from "react-spinners";

interface LoaderProps{
    isLoadingLocal?: boolean
}

const Loader = ({isLoadingLocal} : LoaderProps) => {
    const isLoadingGlobal = useAppSelector(selectLoadingState);

    const isLoading = isLoadingLocal ?? isLoadingGlobal;

    if(!isLoading){
        return null;
    }

    return(
        <div className="flex items-center justify-center min-h-screen bg-black">
            <MoonLoader color="#00f7ff" size={60} />
        </div>
    )
};

export default Loader;