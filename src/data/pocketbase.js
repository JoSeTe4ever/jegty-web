import PocketBase from 'pocketbase';

export const pb = new PocketBase(process.env.REACT_APP_POCKETBASE_URL || 'http://127.0.0.1:8090');

export const normalizeUser = (record = {}) => ({
    ...record,
    uid: record.id,
    email: record.email || '',
    name: record.name || '',
    birthdate: record.birthdate || '',
});

export const toFirebaseDate = (value) => {
    if (!value) {
        return { seconds: Math.floor(Date.now() / 1000) };
    }

    if (value.seconds !== undefined) {
        return value;
    }

    const date = value instanceof Date ? value : new Date(value);
    return { seconds: Math.floor(date.getTime() / 1000) };
};

export const normalizeGame = (record = {}) => ({
    ...record,
    ownerId: record.owner || record.ownerId,
    rawgGameId: record.rawgGameId ? `${record.rawgGameId}` : '',
    startAt: toFirebaseDate(record.startAt),
    createdAt: toFirebaseDate(record.created),
});

export const toDoc = (record, normalizer = (value) => value) => ({
    id: record && record.id,
    data: () => normalizer(record || {}),
});

export const toQuery = (records, normalizer = (value) => value) => ({
    docs: (records || []).map((record) => toDoc(record, normalizer)),
});

export const currentUser = () => normalizeUser(pb.authStore.model || {});

export const loginWithEmail = async (email, password) => {
    const authData = await pb.collection('users').authWithPassword(email, password);
    return { user: normalizeUser(authData.record) };
};

export const registerWithEmail = async (email, password, extra = {}) => {
    const payload = {
        email,
        password,
        passwordConfirm: password,
        name: extra.name || '',
    };

    if (extra.birthdate) {
        payload.birthdate = extra.birthdate;
    }

    const record = await pb.collection('users').create(payload);

    return { user: normalizeUser(record) };
};

export const getPocketBaseErrorMessage = (error) => {
    const data = error && error.data && error.data.data;
    if (data) {
        const fieldErrors = Object.keys(data).map((field) => {
            const message = data[field] && data[field].message ? data[field].message : 'Invalid value';
            return `${field}: ${message}`;
        });

        if (fieldErrors.length > 0) {
            return fieldErrors.join(', ');
        }
    }

    return (error && (error.message || error.toString())) || 'Unexpected backend error';
};

export const logout = () => {
    pb.authStore.clear();
};

export const onAuthStateChanged = (callback) => {
    callback(pb.authStore.isValid ? currentUser() : null);
    return pb.authStore.onChange(() => {
        callback(pb.authStore.isValid ? currentUser() : null);
    }, true);
};
