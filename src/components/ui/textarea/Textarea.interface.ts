import { AreaHTMLAttributes } from "react";
import { IconType } from "react-icons";

export interface ITextArea extends AreaHTMLAttributes<HTMLAreaElement>{
    placeholder: string
    Icon?: IconType
    error?: string
}