import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PersonalFormType, usePersonalFormStore } from "@/store/store";

const PersonalForm = () => {
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedin,
    github,
    portfolio,
    updateField,
  } = usePersonalFormStore();

  const handleInputChange = (
    field: keyof Omit<PersonalFormType, "updateField">,
    value: string
  ) => {
    updateField(field, value);
  };

  return (
    <div>
      <div className="flex flex-col">
        <h1 className="text-2xl text-customDarkBlue font-openSans font-semibold">
          Personal Details
        </h1>
        <p className="text-gray-600 font-openSans font-normal text-sm">
          Get Started with your basic details
        </p>
        <div className="border my-3 border-customDarkBlue"></div>
      </div>
      <div className="grid grid-cols-2 gap-x-2 mt-3">
        <div>
          <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
            First Name
          </Label>
          <Input
            placeholder="John"
            name="firstName"
            value={firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
          />
        </div>
        <div>
          <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
            Last Name
          </Label>
          <Input
            placeholder="Doe"
            name="lastName"
            value={lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
          />
        </div>

        <div className="col-span-1 mt-4">
          <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
            Phone Number
          </Label>
          <Input
            placeholder="+1 123-456-7890"
            name="phoneNumber"
            value={phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
          />
        </div>
        <div className="col-span-1 mt-4">
          <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
            E-Mail
          </Label>
          <Input
            placeholder="john.doe@example.com"
            name="email"
            value={email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
          />
        </div>
        <div className="col-span-2 mt-4">
          <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
            Github
          </Label>
          <Input
            placeholder="github.com/johndoe"
            name="github"
            value={github}
            onChange={(e) => handleInputChange("github", e.target.value)}
            className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
          />
        </div>
        <div className="col-span-2 mt-4">
          <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
            Portfolio Link
          </Label>
          <Input
            placeholder="johnDoe.com"
            name="portfolio"
            value={portfolio}
            onChange={(e) => handleInputChange("portfolio", e.target.value)}
            className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
          />
        </div>
        <div className="col-span-2 mt-4">
          <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
            LinkedIn
          </Label>
          <Input
            placeholder="linkedin.com/in/johndoe"
            name="linkedIn"
            value={linkedin}
            onChange={(e) => handleInputChange("linkedin", e.target.value)}
            className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent focus:text-customDarkBlue"
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default PersonalForm;
