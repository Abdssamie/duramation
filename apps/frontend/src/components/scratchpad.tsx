"use client";

import * as React from "react";
import { useState, useId } from "react";
import { Eye, EyeOff, Check, X, User, Mail, Lock, ChevronDown } from "lucide-react";
import useDictionary from '@/locales/dictionary-hook';

// Utility function for cn
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Enhanced Input Component
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50",
          type === "search" &&
            "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
          type === "file" &&
            "p-0 pr-3 italic text-muted-foreground/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

// Enhanced Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0";
    
    const variants = {
      default: "bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground shadow-sm shadow-black/5 hover:bg-destructive/90",
      outline: "border border-input bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground shadow-sm shadow-black/5 hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-lg px-3 text-xs",
      lg: "h-10 rounded-lg px-8",
      icon: "h-9 w-9",
    };

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

// Label Component
const Label = React.forwardRef<HTMLLabelElement, React.ComponentProps<"label">>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  ),
);
Label.displayName = "Label";

// Textarea Component
const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

// Select Components
interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  placeholder?: string;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ value, onValueChange, children, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");

  const handleSelect = (itemValue: string) => {
    setSelectedValue(itemValue);
    onValueChange?.(itemValue);
    setIsOpen(false);
  };

  const selectedChild = React.Children.toArray(children).find((child) => {
    if (React.isValidElement(child) && (child.props as SelectItemProps).value === selectedValue) {
      return child;
    }
  });

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50"
        )}
      >
        <span className={selectedValue ? "text-foreground" : "text-muted-foreground/70"}>
          {selectedChild ? (selectedChild as React.ReactElement<SelectItemProps>).props.children : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-lg border bg-popover p-1 shadow-md">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<SelectItemProps & { onClick?: () => void }>, {
                onClick: () => handleSelect((child.props as SelectItemProps).value),
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
};

const SelectItem: React.FC<SelectItemProps & { onClick?: () => void }> = ({ 
  children, 
  onClick 
}) => {
  return (
    <div
      className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Password Input with Strength Indicator
interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  showStrength?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder = "Enter password",
  label = "Password",
  showStrength = true,
}) => {
  const id = useId();
  const [isVisible, setIsVisible] = useState(false);
  const dict = useDictionary();

  const requirements = [
    { regex: /.{8,}/, text: dict.scratchpad.passwordRequirements.atLeast8Chars },
    { regex: /[0-9]/, text: dict.scratchpad.passwordRequirements.atLeast1Number },
    { regex: /[a-z]/, text: dict.scratchpad.passwordRequirements.atLeast1Lowercase },
    { regex: /[A-Z]/, text: dict.scratchpad.passwordRequirements.atLeast1Uppercase },
  ];

  const strength = requirements.map((req) => ({
    met: req.regex.test(value),
    text: req.text,
  }));

  const strengthScore = strength.filter((req) => req.met).length;

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return dict.scratchpad.passwordRequirements.enterPassword;
    if (score <= 2) return dict.scratchpad.passwordRequirements.weakPassword;
    if (score === 3) return dict.scratchpad.passwordRequirements.mediumPassword;
    return dict.scratchpad.passwordRequirements.strongPassword;
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={isVisible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {showStrength && value && (
        <>
          <div className="h-1 w-full overflow-hidden rounded-full bg-border">
            <div
              className={`h-full transition-all duration-500 ${getStrengthColor(strengthScore)}`}
              style={{ width: `${(strengthScore / 4) * 100}%` }}
            />
          </div>
          <p className="text-sm font-medium text-foreground">
            {getStrengthText(strengthScore)}. {dict.scratchpad.passwordRequirements.mustContain}
          </p>
          <ul className="space-y-1">
            {strength.map((req, index) => (
              <li key={index} className="flex items-center gap-2">
                {req.met ? (
                  <Check size={16} className="text-emerald-500" />
                ) : (
                  <X size={16} className="text-muted-foreground" />
                )}
                <span className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}>
                  {req.text}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

// Main Form Component
interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "password" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  icon?: React.ReactNode;
}

interface FormData {
  [key: string]: string;
}

const EnhancedForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    bio: "",
    role: "",
  });

  const [errors, setErrors] = useState<FormData>({});
  const dict = useDictionary();

  const fields: FormField[] = [
    {
      id: "firstName",
      label: dict.scratchpad.createAccount.firstName,
      type: "text",
      placeholder: dict.scratchpad.createAccount.enterFirstName,
      required: true,
      icon: <User size={16} />,
    },
    {
      id: "lastName",
      label: dict.scratchpad.createAccount.lastName,
      type: "text",
      placeholder: dict.scratchpad.createAccount.enterLastName,
      required: true,
      icon: <User size={16} />,
    },
    {
      id: "email",
      label: dict.scratchpad.createAccount.emailAddress,
      type: "email",
      placeholder: dict.scratchpad.createAccount.enterEmail,
      required: true,
      icon: <Mail size={16} />,
    },
    {
      id: "password",
      label: dict.scratchpad.createAccount.password,
      type: "password",
      placeholder: dict.scratchpad.createAccount.createPassword,
      required: true,
      icon: <Lock size={16} />,
    },
    {
      id: "confirmPassword",
      label: dict.scratchpad.createAccount.confirmPassword,
      type: "password",
      placeholder: dict.scratchpad.createAccount.confirmPasswordPlaceholder,
      required: true,
      icon: <Lock size={16} />,
    },
    {
      id: "country",
      label: dict.scratchpad.createAccount.country,
      type: "select",
      placeholder: dict.scratchpad.createAccount.selectCountry,
      required: true,
      options: [
        { value: "us", label: dict.scratchpad.countries.us },
        { value: "uk", label: dict.scratchpad.countries.uk },
        { value: "ca", label: dict.scratchpad.countries.ca },
        { value: "au", label: dict.scratchpad.countries.au },
        { value: "de", label: dict.scratchpad.countries.de },
        { value: "fr", label: dict.scratchpad.countries.fr },
      ],
    },
    {
      id: "role",
      label: dict.scratchpad.createAccount.role,
      type: "select",
      placeholder: dict.scratchpad.createAccount.selectRole,
      required: true,
      options: [
        { value: "developer", label: dict.scratchpad.roles.developer },
        { value: "designer", label: dict.scratchpad.roles.designer },
        { value: "manager", label: dict.scratchpad.roles.manager },
        { value: "student", label: dict.scratchpad.roles.student },
        { value: "other", label: dict.scratchpad.roles.other },
      ],
    },
    {
      id: "bio",
      label: dict.scratchpad.createAccount.bio,
      type: "textarea",
      placeholder: dict.scratchpad.createAccount.tellUsAbout,
      required: false,
    },
  ];

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormData = {};

    fields.forEach((field) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = dict.scratchpad.formValidation.fieldRequired.replace('{fieldName}', field.label);
      }

      if (field.type === "email" && formData[field.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.id] || "")) {
          newErrors[field.id] = dict.scratchpad.formValidation.validEmail;
        }
      }

      if (field.id === "confirmPassword" && formData.password !== formData.confirmPassword) {
        newErrors[field.id] = dict.scratchpad.formValidation.passwordsMismatch;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted: ", formData);
      alert(dict.scratchpad.createAccount.submit + " " + dict.scratchpad.createAccount.success || "successfully!");
    }
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      value: formData[field.id] || "",
      placeholder: field.placeholder,
    };

    switch (field.type) {
      case "password":
        if (field.id === "password") {
          return (
            <PasswordInput
              value={formData[field.id] || ""}
              onChange={(value) => handleInputChange(field.id, value)}
              placeholder={field.placeholder}
              label={field.label}
            />
          );
        } else {
          return (
            <div className="space-y-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              <div className="relative">
                <Input
                  id={field.id}
                  type="password"
                  {...commonProps}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  className={field.icon ? "pl-10" : ""}
                />
                {field.icon && (
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {field.icon}
                  </div>
                )}
              </div>
            </div>
          );
        }

      case "textarea":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Textarea
              id={field.id}
              {...commonProps}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
            />
          </div>
        );

      case "select":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Select
              value={formData[field.id]}
              onValueChange={(value) => handleInputChange(field.id, value)}
              placeholder={field.placeholder}
            >
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <div className="relative">
              <Input
                id={field.id}
                type={field.type}
                {...commonProps}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className={field.icon ? "pl-10" : ""}
              />
              {field.icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {field.icon}
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{dict.scratchpad.createAccount.title}</h1>
        <p className="text-muted-foreground">
          {dict.scratchpad.createAccount.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {fields.slice(0, 2).map((field) => (
            <div key={field.id} className="space-y-2">
              {renderField(field)}
              {errors[field.id] && (
                <p className="text-sm text-red-500">{errors[field.id]}</p>
              )}
            </div>
          ))}
        </div>

        {fields.slice(2).map((field) => (
          <div key={field.id} className="space-y-2">
            {renderField(field)}
            {errors[field.id] && (
              <p className="text-sm text-red-500">{errors[field.id]}</p>
            )}
          </div>
        ))}

        <Button type="submit" className="w-full" size="lg">
          {dict.scratchpad.createAccount.submit}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        {dict.scratchpad.createAccount.alreadyHaveAccount}{" "}
        <button className="font-medium text-primary hover:underline">
          {dict.scratchpad.createAccount.signIn}
        </button>
      </div>
    </div>
  );
};

export default EnhancedForm;
