// import prisma from "@/lib/prisma";

import prisma from "@/prisma/prisma";

export default async function Home() {
  const data = await fetch("http://localhost:3000/api/client");
  // const clients = await data.json();
  console.log(data);
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const telephone = formData.get("telephone") as string | null;
    const state = formData.get("state") as string | null;
    const city = formData.get("city") as string | null;
    const zip = formData.get("zip") as string | null;

    if (!name || !email || !telephone || !state || !city || !zip) {
      console.error("All fields are required.");
      return;
    }
    // const result = await prisma.Post.create({

    // })

    try {
      const result = await prisma.client.create({
        data: {
          name,
          email,
          telephone,
          state,
          city,
          zip,
        },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
      return;
      // throw new Error('Error')
      // return
    }

    // console.log({ name, email, telephone, state, city, zip });
  };

  return (
    <div className="w-full h-screen bg-white">
      <form
        action={handleSubmit}
        className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Claim Insurance Form
        </h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            // value={formData.name}
            // onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            // value={formData.email}
            // onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="telephone"
            className="block text-gray-700 font-medium mb-2"
          >
            Telephone
          </label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            required
            // value={formData.telephone}
            // onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="state"
            className="block text-gray-700 font-medium mb-2"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            required
            // value={formData.state}
            // onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-gray-700 font-medium mb-2"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            required
            // value={formData.city}
            // onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="zip" className="block text-gray-700 font-medium mb-2">
            Zip Code
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            required
            // value={formData.zip}
            // onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Claim Insurance
          </label>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="claimInsurance"
                // value="yes"
                // checked={formData.claimInsurance === true}
                // onChange={() => setFormData((prev) => ({ ...prev, claimInsurance: true }))}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="claimInsurance"
                // value="no"
                // checked={formData.claimInsurance === false}
                // onChange={() => setFormData((prev) => ({ ...prev, claimInsurance: false }))}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
