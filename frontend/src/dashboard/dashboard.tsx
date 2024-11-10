import AddResume from "@/components/custom/AddResume";

const Dashboard = () => {
  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h1 className="font-openSans text-customDarkBlue font-bold text-xl">
        My Resume
      </h1>
      <p className="font-openSans text-gray-500 text-sm">
        Build your brand-new resume in as little as 3 minutes.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6  gap-3 mt-10">
        <AddResume />
      </div>
    </div>
  );
};

export default Dashboard;
