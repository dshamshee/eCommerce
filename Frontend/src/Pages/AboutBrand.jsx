import brandlogoBlack from "../assets/brand-logo-black.png"
import brandlogoWhite from "../assets/brand-logo-white.png"

export const AboutBrand = () => {
  return (
    <div className="mainContainer">
      <div className="innerContainer py-16 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <h2 className="text-3xl font-bold dark:text-gray-100 text-gray-900 mb-6">
            About Us: Where Style Meets Purpose
          </h2>

          {/* Mission Statement */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold dark:text-gray-100 text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-lg dark:text-gray-400 text-gray-900 italic">
              "Born from a passion for sustainable fashion, Wolvenstitch is
              dedicated to creating timeless, high-quality clothing that doesn't
              compromise the planet. We believe in style that feels good, looks
              good, and does good—one stitch at a time."
            </p>
          </div>

          {/* Founder's Note */}
          <div className="dark:bg-gray-800 bg-gray-50 p-8 rounded-lg border dark:border-gray-700 border-gray-200">
            <h3 className="text-xl font-semibold dark:text-gray-100 text-gray-800 mb-4">
              The Story Behind the Seams
            </h3>
            <div className="flex items-center justify-center mb-4">
              {/* Replace with actual founder image */}
              <div className="w-16 h-16 rounded-full dark:bg-gray-700 bg-gray-300 flex items-center justify-center dark:text-gray-100 text-gray-900">
                <img src={brandlogoBlack} alt="Founder" className="w-full h-full object-cover rounded-full dark:hidden" />
                <img src={brandlogoWhite} alt="Founder" className="w-full h-full object-cover rounded-full hidden dark:block" />
              </div>
            </div>
            <p className="dark:text-gray-400 text-gray-900 mb-4">
              "Hi, I'm Danish Shamshee, the heart behind Wolvenstitch. After
              years of working in fast fashion, I was frustrated by the
              industry's waste and lack of transparency. I dreamed of a brand
              that blended ethical craftsmanship with modern design—where every
              piece tells a story.
            </p>
            <p className="dark:text-gray-400 text-gray-900 mb-4">
              In 2025, I started small: a single sewing machine, organic
              fabrics, and a stubborn belief that fashion could be better.
              Today, we're a growing community of mindful shoppers and makers,
              proving that you don't have to sacrifice style for sustainability.
            </p>
            <p className="dark:text-gray-400 text-gray-900 font-medium">
              When you wear Wolvenstitch, you're not just wearing clothes—you're
              wearing change."
            </p>
          </div>

          {/* Optional Brand Values */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: "♻️",
                title: "Sustainable Materials",
                desc: "Eco-friendly fabrics",
              },
              {
                icon: "✊",
                title: "Ethical Production",
                desc: "Fair wages & safe conditions",
              },
              {
                icon: "✨",
                title: "Timeless Design",
                desc: "Pieces that last",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 dark:bg-gray-800 bg-gray-50 rounded-lg shadow-md"
              >
                <div className="text-2xl mb-2 ">{item.icon}</div>
                <h4 className="font-medium dark:text-gray-100 text-gray-900">
                  {item.title}
                </h4>
                <p className="text-sm dark:text-gray-400 text-gray-900">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
