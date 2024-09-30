export const PasswordHint = () => {
  return (
    <div className="text-xs flex flex-col justify-center items-start mt-4 text-[#666666] gap-y-4">
      <div>
        <span className="font-bold">Must contain:</span>
        <ul className="ml-2 mt-1.5">
          <li className="list-item-checkmark">8-20 characters</li>
        </ul>
      </div>
      <div>
        <span className="font-bold">And 2 of the following:</span>
        <ul className="ml-2 mt-1.5 flex flex-col justify-center items-start gap-y-1.5">
          <li className="list-item-checkmark">Lowercase letters</li>
          <li className="list-item-checkmark">Uppercase letters</li>
          <li className="list-item-checkmark">Numbers</li>
          <li className="list-item-checkmark">Special characters, except &lt; &gt;</li>
        </ul>
      </div>
    </div>
  );
};
