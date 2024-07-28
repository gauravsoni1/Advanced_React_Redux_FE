import { ReactNode, createContext, useContext } from "react";
import { featureFlag } from "../../const/featureFlag";

const FeatureFlagContext = createContext({});


export const FeatureFlagProvider = ({ children }: { children: ReactNode }) => {
    return (
        <FeatureFlagContext.Provider value={featureFlag}>
            {children}
        </FeatureFlagContext.Provider>
    )
}

export const useFeatureFlags = () => useContext(FeatureFlagContext);