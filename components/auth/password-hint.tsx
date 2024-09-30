import { cn } from "@/lib/utils";

type PasswordCriteriaProps = {
  passwordCriteria: {
    length: boolean;
    lowercase: boolean;
    uppercase: boolean;
    number: boolean;
    specialChar: boolean;
    minTwoCriteria: boolean;
  };
};

export const PasswordHint = ({ passwordCriteria }: PasswordCriteriaProps) => {
  return (
    <div className="text-xs flex flex-col justify-center items-start mt-4 text-[#666666] gap-y-4">
      <div>
        <span className="font-bold">Must contain:</span>
        <ul className="ml-2 mt-1.5">
          <li className={cn(passwordCriteria.length && "text-green-700 list-item-checkmark")}>8-20 characters</li>
        </ul>
      </div>
      <div>
        <span className="font-bold">And 2 of the following:</span>
        <ul className="ml-2 mt-1.5 flex flex-col justify-center items-start gap-y-1.5">
          <li className={cn(passwordCriteria.lowercase && "text-green-700 list-item-checkmark")}>Lowercase letters</li>
          <li className={cn(passwordCriteria.uppercase && "text-green-700 list-item-checkmark")}>Uppercase letters</li>
          <li className={cn(passwordCriteria.number && "text-green-700 list-item-checkmark")}>Numbers</li>
          <li className={cn(passwordCriteria.specialChar && "text-green-700 list-item-checkmark")}>
            Special characters, except &lt; &gt;
          </li>
        </ul>
      </div>
    </div>
  );
};
