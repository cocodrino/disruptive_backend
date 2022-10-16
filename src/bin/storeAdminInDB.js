import Credential from "../server/models/Credential";

const storeAdminInDB = async (apiKey,apiSecret)=> {
    const update = {apiKey,apiSecret}
    const user = await Credential.findOneAndUpdate({admin: true},update,{new:true,upsert:true})

    return user.id

}

export default storeAdminInDB