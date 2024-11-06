
export async function login(identifier: string, password: string): Promise<string | Error> {
    const url = 'https://learn.reboot01.com/api/auth/signin';
    const credentials = `${identifier}:${password}`;
    const encodedCredentials = btoa(credentials);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'authorization': `Basic ${encodedCredentials}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to sign in');
        }

        return await response.text(); 
    } catch (error: any) {

        return error;
    }
}

export function isloggedin(): boolean {
    // TODO: Use also a query to check from the backend
    if (localStorage.getItem('jwt_token')) {
        return true
    }
    return false
}