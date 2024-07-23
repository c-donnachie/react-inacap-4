import { BASE_URL } from "@/constans/ApiURL";

const route = 'cliente';

export const apiGetClientes = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const res = await fetch(`${BASE_URL}/${route}?_size=200`, requestOptions);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const apiCreateCliente = async (data) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    try {
        const res = await fetch(`${BASE_URL}/${route}`, requestOptions);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}