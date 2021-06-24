import isoFetch from 'isomorphic-fetch'; 
import {commentsLoadingAC, commentsSetAC, commentsErrorAC} from './countersAC';

let password = Math.random();

const DataLoad = (dispatch) => {
    
    return () => {
        let sp = new URLSearchParams();
        sp.append("f", "READ");
        sp.append("n", "POTOTSKAYA_JUNO_COMMENTS");

        const requestOptions = {
            method: 'POST',
            cache: 'no-cache', 
            body: sp,
        };

        dispatch( commentsLoadingAC() );
        isoFetch('https://fe.it-academy.by/AjaxStringStorage2.php', requestOptions)
            .then( (response) => { 
                if (!response.ok) {
                    let Err=new Error("fetch error " + response.status);
                    Err.userMessage="Ошибка связи";
                    throw Err;
                }
                else
                    return response.json();
            })
            .then( (data) => {
                dispatch( commentsSetAC(JSON.parse(data.result)) );
            })
            .catch( (error) => {
                console.error(error);
                dispatch( commentsErrorAC() );
            });
    }
}

const DataLockget = (info) => {
    let sp = new URLSearchParams();
    sp.append("f", "LOCKGET");
    sp.append("n", "POTOTSKAYA_JUNO_COMMENTS");
    sp.append("p", password);

    const requestOptions = {
        method: 'POST',
        cache: 'no-cache', 
        body: sp,
    };

    isoFetch('https://fe.it-academy.by/AjaxStringStorage2.php', requestOptions)
        .then( (response) => { 
            if (!response.ok) {
                let Err=new Error("fetch error " + response.status);
                Err.userMessage="Ошибка связи";
                throw Err;
            }
            else
                return response.json();
        })
        .then( () => {
            DataUpdate(info);
        })
        .catch( (error) => {
            console.error(error);
            dispatch( commentsErrorAC() );
        });
}

const DataUpdate = (val) => {
    let sp = new URLSearchParams();
    sp.append("f", "UPDATE");
    sp.append("n", "POTOTSKAYA_JUNO_COMMENTS");
    sp.append("v", JSON.stringify(val));
    sp.append("p", password);

    const requestOptions = {
        method: 'POST',
        cache: 'no-cache', 
        body: sp,
    };

    isoFetch('https://fe.it-academy.by/AjaxStringStorage2.php', requestOptions)
        .then( (response) => { 
            if (!response.ok) {
                let Err=new Error("fetch error " + response.status);
                Err.userMessage="Ошибка связи";
                throw Err;
            }
            else
                return response.json();
        })
        .catch( (error) => {
            console.error(error);
            dispatch( commentsErrorAC() );
        });
}

export { DataLoad, DataLockget, DataUpdate};