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
    <div className="w-full text-xs flex flex-col justify-center items-start mt-4 text-[#666666] gap-y-4">
      <div>
        <span className="font-bold">Must contain:</span>
        <ul className="ml-4 mt-1.5">
          <li className={cn(passwordCriteria.length && "text-green-700 list-item-checkmark relative")}>8-20 characters</li>
        </ul>
      </div>
      <div>
        <span className="font-bold">And 2 of the following:</span>
        <ul className="ml-4 mt-1.5 flex flex-col justify-center items-start gap-y-1.5">
          <li className={cn(passwordCriteria.lowercase && "text-green-700 list-item-checkmark relative")}>Lowercase letters</li>
          <li className={cn(passwordCriteria.uppercase && "text-green-700 list-item-checkmark relative")}>Uppercase letters</li>
          <li className={cn(passwordCriteria.number && "text-green-700 list-item-checkmark relative")}>Numbers</li>
          <li className={cn(passwordCriteria.specialChar && "text-green-700 list-item-checkmark relative")}>
            Special characters, except &lt; &gt;
          </li>
        </ul>
      </div>
    </div>
  );
};
