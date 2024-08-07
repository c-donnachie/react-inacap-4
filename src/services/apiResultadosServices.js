import { BASE_URL } from "@/constans/ApiURL";

const route = 'resultado';

export const apiGetResultados = async () => {
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

export const apiDeleteResultados = async (id) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await fetch(`${BASE_URL}/${route}/${id}`, requestOptions);

        if (res.status === 400) {
            throw new Error('Network response was not ok');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const apiUpdateResultado = async (id, body) => {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };

    try {
        const res = await fetch(`${BASE_URL}/${route}/${id}`, requestOptions);

        if (res.status === 400) {
            throw new Error('Network response was not ok');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const apiCreateResultado = async (body) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };

    try {
        const res = await fetch(`${BASE_URL}/${route}`, requestOptions);

        if (res.status === 400) {
            console.log('error')
            throw new Error('Network response was not ok');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}