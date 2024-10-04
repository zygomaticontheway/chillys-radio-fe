import { jwtDecode } from "jwt-decode";


interface JwtPayload {
    name: string;
    exp: number;
    iat: number;
    isAdmin: boolean;
}

export const getNameFromToken = (): string | null => {
        const token = localStorage.getItem('user-token');
        if(!token) {
            return null;
        }
        try {
            const decodedToken = jwtDecode<JwtPayload>(token);
            return decodedToken.name;
        } catch(error) {
            console.error('error during decoding');
            return null;
        }
};

export const getIsAdminFromToken = (): boolean | null => {
    const token = localStorage.getItem('user-token');
    if(!token) {
        return null;
    }
    try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        return decodedToken.isAdmin;
    } catch(error) {
        console.error('error during decoding');
        return null;
    }
};
