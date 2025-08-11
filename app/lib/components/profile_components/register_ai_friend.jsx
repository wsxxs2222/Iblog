'use Client'
import { useState } from "react"
import axios from "axios";
import { useSession } from "next-auth/react";

function RegisterAiInput({setAiFriend}) {
    const [aiInformation, setAiInformation] = useState({
        name: '',
        character: '',
        relationToUser: '',
    });
    const {data: sessionData} = useSession();
    const email = sessionData?.user.email;

    return <div>
        <input type="text" name="name" value={aiInformation.name} 
            placeholder="enter ai name" onChange={updateAiInformation}/>
        <input type="text" name="character" value={aiInformation.character} 
            placeholder="enter ai character" onChange={updateAiInformation} />
        <input type="text" name="relationToUser" value={aiInformation.relationToUser} 
            placeholder="relation to user" onChange={updateAiInformation} />
        <button onClick={registerNewAiFriend}>submit</button>
    </div>

    function updateAiInformation(event) {
        const {name, value} = event.target;
        setAiInformation({...aiInformation, [name]: value,});
    }

    async function registerNewAiFriend() {
        await axios.post('/api/ai', {newAiFriend: aiInformation, email: email});
        const result = await axios.get(`/api/ai?email=${email}`);
        const aiFriend = result.data?.aiFriend;
        setAiFriend(aiFriend);
    }
}

export {RegisterAiInput}