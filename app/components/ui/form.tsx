"use client";

import * as React from "react";
import {cn} from "@/lib/utils";

const Form = React.forwardRef<HTMLFormElement, React.FormHTMLAttributes<HTMLFormElement>>(({className, ...props}, ref) => {
	return (
		<form
			ref={ref}
			className={cn("space-y-6", className)}
			{...props}
		/>
	);
});
Form.displayName = "Form";

const FormField = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref) => {
	return (
		<div
			ref={ref}
			className={cn("space-y-2", className)}
			{...props}
		/>
	);
});
FormField.displayName = "FormField";

const FormLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(({className, ...props}, ref) => {
	return (
		<label
			ref={ref}
			className={cn("block text-sm font-medium text-foreground", className)}
			{...props}
		/>
	);
});
FormLabel.displayName = "FormLabel";

const FormInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({className, ...props}, ref) => {
	return (
		<input
			ref={ref}
			className={cn(
				"w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200",
				className
			)}
			{...props}
		/>
	);
});
FormInput.displayName = "FormInput";

const FormError = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({className, ...props}, ref) => {
	return (
		<p
			ref={ref}
			className={cn("text-sm text-destructive", className)}
			{...props}
		/>
	);
});
FormError.displayName = "FormError";

const FormButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({className, ...props}, ref) => {
	return (
		<button
			ref={ref}
			className={cn(
				"w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-semibold py-3 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-card disabled:cursor-not-allowed",
				className
			)}
			{...props}
		/>
	);
});
FormButton.displayName = "FormButton";

export {Form, FormField, FormLabel, FormInput, FormError, FormButton};
