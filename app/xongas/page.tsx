import { FC, ReactNode } from "react";

type PersonCardProps = {
    firstName: string;
    lastName: string;
    email: string;
    photo: string;
    children: ReactNode;
};



const PersonCard: FC<PersonCardProps> = ({ firstName, lastName, email, photo, children }) => {
    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
                <PersonCardPhoto photo={photo} alt={firstName} />

                <PersonCardPersonalInformation firstName={firstName} lastName={lastName} email={email} />
                {children}
            </div>
        </div>
    );
};

type PersonCardPersonalInformationProps = { email: string, firstName: string, lastName: string }

const PersonCardPersonalInformation: FC<PersonCardPersonalInformationProps> = ({ email, firstName, lastName }) => {
    return (
        <>
            <p style={{ fontSize: 25 }}>
                {firstName} {lastName}
            </p>
            <p>
                <b>
                    Email: {" "}
                </b>
                {email}
            </p>
        </>
    )
}

const PersonCardPhoto: FC<{ photo: string, alt: string }> = ({ photo, alt }) => {
    return (
        <img src={photo} alt={alt} width={200} style={{ borderWidth: "2px", borderRadius: "1000px" }} />
    )
}

export default function Xongas() {

    return (
        <main className="flex h-screen flex-col justify-between font-sans ">
            <PersonCard firstName="FirstName" lastName="LastName" email="email@server.com" photo="darwin.svg">
                Children
            </PersonCard>
        </main>
    );
}
