import { User } from "@/types";

const GetUsers = async (): Promise<User[]> => {
    const data = await fetch("https://jsonplaceholder.typicode.com/users");

    return data.json();
};

export default GetUsers;
