'use client'
import axios from 'axios'

const apiUrl = `https://n8n.tooltech.co.il/webhook/1b665f5e-5cdc-42cc-9b92-52c202587250`

class ContactService {
    constructor(_Params={}) {
        for (const [key, value] of Object.entries(_Params)) {
            this[key] = value;
        }
    }
    
    Create = async (contact) => {
        try {
            const { data } = await axios.post(`${apiUrl}`, contact)
            return data
        }
        catch (error) {            
            return Promise.reject(error)
        }
    }
    
    
}
export default ContactService