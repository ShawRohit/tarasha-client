interface User {
    _id?: string;
    name?: string;
    email?: string;
    number?: string;
    countryCode?: string;
}


interface AuthContextType {
    isAuthModalOpen: boolean;
    isAuthenticated?: boolean;
    openAuthModal: () => void;
    closeAuthModal: () => void;
    handleAuthentication: () => void;
    user: User;
    setUser: ({...params}) => void;
}

export type {
    AuthContextType
}