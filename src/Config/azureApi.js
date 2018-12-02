


const createFace = (image, name) => {
    return new Promise((resolve, reject) => {
        fetch('https://westeurope.api.cognitive.microsoft.com/face/v1.0/largepersongroups/userfaces/persons?largePersonGroupId=userfaces', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': 'd97f0f8989384a7fa56c411ee835e61c'
            },
            body: JSON.stringify({
                "name": name
            })
        }).then(res => res.json()).then(res => resolve(res.personId)).catch(err => reject(err))
    })
}

const addFace = (personId, image) => {
    return new Promise((resolve, reject) => {
        fetch(`https://westeurope.api.cognitive.microsoft.com/face/v1.0/largepersongroups/userfaces/persons/${personId}/persistedfaces`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': 'd97f0f8989384a7fa56c411ee835e61c'
            },
            body: JSON.stringify({
                "url": image
            })
        }).then(res => res.json()).then(res => {
            res.actualId = personId
            resolve(res)
        }).catch(err => reject(err))
    })
}



const detectFace = (image) => {
    return new Promise((resolve, reject) => {
        fetch(`https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': 'd97f0f8989384a7fa56c411ee835e61c'
            },
            body: JSON.stringify({
                "url": image
            })
        }).then(res => res.json()).then(res => resolve(res[0].faceId)).catch(err => reject(err))
    })
}

const indentifyUser = (faceId) => {
    console.log(faceId);
    const id = faceId
    return new Promise((resolve, reject) => {
        fetch(`https://westeurope.api.cognitive.microsoft.com/face/v1.0/identify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': 'd97f0f8989384a7fa56c411ee835e61c'
            },
            body: JSON.stringify({
                "largePersonGroupId": "userfaces",
                "faceIds": [id],
                "maxNumOfCandidatesReturned": 1,
                "confidenceThreshold": 0.5
            })
        }).then(res => res.json()).then(res => resolve(res)).catch(err => reject(err))
    })
}


export const RegisterUser = (image, name) => {
    return new Promise((resolve, reject) => {
        createFace(null, name).then(personId => addFace(personId, image)).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}


export const getUser = (image) => {
    return new Promise((resolve, reject) => {
        detectFace(image).then(faceId => indentifyUser(faceId)).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

