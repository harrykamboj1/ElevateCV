import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PersonalFormType,
  useDataSaveType,
  usePersonalFormStore,
  useResumeState,
} from "@/store/store";

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

  const personal = useResumeState((state) => state.personal);
  const setPersonal = useResumeState((state) => state.setPersonal);
  const setIsDataSave = useDataSaveType((state) => state.setIsDataSave);

  const handleInputChange = (
    field: keyof Omit<PersonalFormType, "updateField">,
    value: string
  ) => {
    updateField(field, value);
    setPersonal({ ...personal, [field]: value });
    setIsDataSave(false);
  };

  return (
    <div className="px-5 py-10 h-full    border-2 border-blue-500  rounded-xl p-6 shadow-xl      bg-customDarkBlue">
      <div className="flex flex-col">
        <h1 className="text-2xl text-blue-500 font-dmSans  font-semibold">
          Personal Details
        </h1>
        <p className="text-zinc-300  font-dmSans font-normal text-sm">
          Get Started with your basic details
        </p>
        <div className="border my-3 border-zinc-400"></div>
      </div>
      <div className="grid grid-cols-2 gap-x-2 mt-3">
        <div>
          <Label className="text-sm text-red-500 font-dmSans font-semibold">
            First Name
          </Label>
          <Input
            placeholder="John"
            name="firstName"
            value={firstName}
            autoComplete="off"
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="mt-1 border-zinc-400 bg-backgroundColor text-white text-lg  focus-visible:ring-transparent "
          />
        </div>
        <div>
          <Label className="text-sm text-red-500 font-dmSans font-semibold">
            Last Name
          </Label>
          <Input
            placeholder="Doe"
            name="lastName"
            autoComplete="off"
            value={lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="mt-1 border-zinc-400 bg-backgroundColor text-white text-lg  focus-visible:ring-transparent"
          />
        </div>

        <div className="col-span-1 mt-4">
          <Label className="text-sm text-red-500 font-dmSans font-semibold">
            Phone Number
          </Label>
          <Input
            placeholder="+1 123-456-7890"
            name="phoneNumber"
            value={phone}
            autoComplete="off"
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="mt-1 border-zinc-400 bg-backgroundColor text-white text-lg  focus-visible:ring-transparent "
          />
        </div>
        <div className="col-span-1 mt-4">
          <Label className="text-sm text-red-500 font-dmSans font-semibold">
            E-Mail
          </Label>
          <Input
            placeholder="john.doe@example.com"
            name="email"
            value={email}
            autoComplete="off"
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="mt-1 border-zinc-400  bg-backgroundColor text-white text-lg  focus-visible:ring-transparent"
          />
        </div>
        <div className="col-span-2 mt-4">
          <Label className="text-sm text-red-500 font-dmSans font-semibold">
            LinkedIn
          </Label>
          <Input
            placeholder="linkedin.com/in/johndoe"
            name="linkedIn"
            value={linkedin}
            autoComplete="off"
            onChange={(e) => handleInputChange("linkedin", e.target.value)}
            className="mt-1 border-zinc-400 bg-backgroundColor text-white text-lg   focus-visible:ring-transparent "
          />
        </div>
        <div className="col-span-2 mt-4">
          <Label className="text-sm text-red-500 font-dmSans font-semibold">
            Github
          </Label>
          <Input
            placeholder="github.com/johndoe"
            name="github"
            value={github}
            autoComplete="off"
            onChange={(e) => handleInputChange("github", e.target.value)}
            className="mt-1 border-zinc-400 bg-backgroundColor text-white text-lg  focus-visible:ring-transparent"
          />
        </div>
        <div className="col-span-2 mt-4">
          <Label className="text-sm text-red-500 font-dmSans font-semibold">
            Portfolio Link
          </Label>
          <Input
            placeholder="johnDoe.com"
            name="portfolio"
            value={portfolio}
            autoComplete="off"
            onChange={(e) => handleInputChange("portfolio", e.target.value)}
            className="mt-1 border-zinc-400 bg-backgroundColor text-white text-lg  focus-visible:ring-transparent"
          />
        </div>
      </div>
      {/* <div className="mt-4 flex justify-end">
        <Button className="bg-blue-800 hover:bg-blue-900 p-x-2 w-36">
          Save Data
        </Button>
      </div> */}
    </div>
  );
};

export default PersonalForm;
