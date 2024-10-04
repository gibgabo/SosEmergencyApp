import React from "react";
import FireIcon from "@/Components/Icons/FireIcon";
import AccidentIcon from "@/Components/Icons/AccidentIcon";
import FloodIcon from "@/Components/Icons/FloodIcon";
import CrimeIcon from "@/Components/Icons/CrimeIcon";
import MedicalIcon from "@/Components/Icons/MedicalIcon";
import OtherIcon from "@/Components/Icons/OtherIcon";

export default function CategoryIcon ({ categoryType }) {
    switch (categoryType) {
        case "Fire":
            return <FireIcon />;
        case "Accidents":
            return <AccidentIcon />;
        case "Flood":
            return <FloodIcon />;
        case "Crime":
            return <CrimeIcon />;
        case "Medical":
            return <MedicalIcon />;
        case "Others":
            return <OtherIcon />;
        default:
            return <OtherIcon />;
    }
};


