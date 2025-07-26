import React, { useState, useEffect } from "react";


const testimonials = [
	{
		text: "V2S helped me find reliable suppliers for my chaat stall. Now I serve hygienic food and my sales have grown!",
		name: "Ramesh, Pani Puri Vendor (Delhi)",
	},
	{
		text: "Earlier, I struggled to find trusted vendors for my masala supplies. With V2S, my business is booming!",
		name: "Sunita, Supplier (Mumbai)",
	},
	{
		text: "I never thought finding government-approved products could be this easy. V2S is a game changer!",
		name: "Arjun, Vada Pav Vendor (Pune)",
	},
	{
		text: "Thanks to V2S, I now get quality ingredients at the best price and my customers trust me more.",
		name: "Priya, Chaat Vendor (Lucknow)",
	},
	{
		text: "V2S made it easy to connect with new vendors and grow my supply business.",
		name: "Amit, Supplier (Ahmedabad)",
	},
	{
		text: "I can now ensure hygiene standards for my customers, thanks to V2S.",
		name: "Deepika, Street Food Vendor (Kolkata)",
	},
	{
		text: "V2S has transformed my street food business. I highly recommend it!",
		name: "Vikram, Dosa Vendor (Chennai)",
	},
	{
		text: "V2S is a lifesaver! I can easily order supplies and focus on my customers.",
		name: "Neha, Momos Vendor (Gangtok)",
	},
	{
		text: "I used to worry about the quality of ingredients. Now, I trust V2S completely!",
		name: "Rajesh, Samosa Vendor (Jaipur)",
	},
];

const features = [
	{
		title: "Verified Suppliers",
		description:
			"Connect with government-approved suppliers for quality ingredients.",
		icon: "check-circle", // Replace with actual icon component or SVG
	},
	{
		title: "Easy Ordering",
		description:
			"Streamline your ordering process with our user-friendly platform.",
		icon: "shopping-cart", // Replace with actual icon component or SVG
	},
	{
		title: "Hygiene Standards",
		description: "Ensure hygiene and food safety with trusted suppliers.",
		icon: "shield-check", // Replace with actual icon component or SVG
	},
	{
		title: "Business Growth",
		description: "Expand your reach and grow your street food business.",
		icon: "trending-up", // Replace with actual icon component or SVG
	},
];

function Home() {
	const [testimonialIndex, setTestimonialIndex] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
		}, 5000); // Change testimonial every 5 seconds

		return () => clearInterval(intervalId); // Clean up interval on unmount
	}, []);

	return (
		<div className="min-h-screen bg-white flex flex-col">
			{/* Navbar */}
			<nav className="w-full bg-white shadow flex items-center justify-between px-8 py-4 fixed top-0 left-0 z-50">
				<span className="text-2xl font-extrabold text-amber-400 flex items-center gap-2">
					<span>V2S</span>
					<span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full ml-2 flex items-center gap-1">
						<svg
							className="w-4 h-4 inline-block mr-1 text-green-500"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M5 13l4 4L19 7"
							/>
						</svg>
						Trusted Premium
					</span>
				</span>
				<div className="flex gap-8">
					<a
						href="#features"
						className="text-gray-700 hover:text-blue-600 font-medium"
					>
						Features
					</a>
					<a
						href="#about"
						className="text-gray-700 hover:text-blue-600 font-medium"
					>
						About Us
					</a>
					<a
						href="#contact"
						className="text-gray-700 hover:text-blue-600 font-medium"
					>
						Contact
					</a>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="w-full py-24 bg-gradient-to-br from-blue-50 to-amber-50">
				<div className="container mx-auto px-4">
					<div className="max-w-2xl mx-auto text-center">
						<h1 className="text-4xl font-bold text-gray-800 mb-6">
							The Platform for Safer, Smarter Street Food
						</h1>
						<p className="text-lg text-gray-600 mb-8">
							V2S connects street food vendors with trusted, government-approved
							suppliers, ensuring hygiene, trust, and easy access to quality
							products.
						</p>
						<a
							href="/signup"
							className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 text-lg font-semibold transition"
						>
							Get Started
						</a>
					</div>
				</div>
			</section>

			{/* Feature Highlights */}
			<section id="features" className="w-full py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{features.map((feature, index) => (
							<div key={index} className="text-center">
								{/* Replace with actual icon component or SVG */}
								<div className="mx-auto w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
									{feature.icon}
								</div>
								<h3 className="text-xl font-semibold text-gray-800 mb-2">
									{feature.title}
								</h3>
								<p className="text-gray-600">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Vendor & Supplier Cards */}
			<section className="w-full py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Vendor Card */}
						<div className="bg-white rounded-lg shadow-md p-8">
							<h2 className="text-2xl font-bold text-blue-700 mb-4">
								For Vendors
							</h2>
							<ul className="mb-6 space-y-2 text-gray-700">
								<li className="flex items-center gap-2">
									<svg
										className="w-5 h-5 text-green-500"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5 13l4 4L19 7"
										/>
									</svg>
									Access trusted suppliers
								</li>
								<li className="flex items-center gap-2">
									<svg
										className="w-5 h-5 text-green-500"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5 13l4 4L19 7"
										/>
									</svg>
									Order hygienic products easily
								</li>
								<li className="flex items-center gap-2">
									<svg
										className="w-5 h-5 text-green-500"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5 13l4 4L19 7"
										/>
									</svg>
									Grow your business
								</li>
							</ul>
							<a
								href="/vendor"
								className="block text-center px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 text-lg font-semibold transition"
							>
								I am a Vendor
							</a>
						</div>

						{/* Supplier Card */}
						<div className="bg-white rounded-lg shadow-md p-8">
							<h2 className="text-2xl font-bold text-amber-500 mb-4">
								For Suppliers
							</h2>
							<ul className="mb-6 space-y-2 text-gray-700">
								<li className="flex items-center gap-2">
									<svg
										className="w-5 h-5 text-green-500"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5 13l4 4L19 7"
										/>
									</svg>
									Reach more vendors
								</li>
								<li className="flex items-center gap-2">
									<svg
										className="w-5 h-5 text-green-500"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5 13l4 4L19 7"
										/>
									</svg>
									Showcase approved products
								</li>
								<li className="flex items-center gap-2">
									<svg
										className="w-5 h-5 text-green-500"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5 13l4 4L19 7"
										/>
									</svg>
									Sell faster
								</li>
							</ul>
							<a
								href="/supplier"
								className="block text-center px-6 py-2 bg-amber-400 text-gray-900 rounded-lg shadow hover:bg-amber-500 text-lg font-semibold transition"
							>
								I am a Supplier
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="w-full py-16">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
						What Our Users Say
					</h2>
					<div className="max-w-3xl mx-auto">
						<div className="p-6 flex flex-col items-center bg-white rounded-lg shadow-md">
							<p className="text-gray-700 text-center italic">
								"{testimonials[testimonialIndex].text}"
								<br />
								<span className="text-sm text-gray-500">
									— {testimonials[testimonialIndex].name}
								</span>
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* About Us Section */}
			<section id="about" className="w-full py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
							About Us
						</h2>
						<p className="text-lg text-gray-600 mb-6">
							V2S is on a mission to revolutionize the street food ecosystem by
							connecting vendors with trusted, government-approved suppliers. We
							believe that everyone deserves access to safe, hygienic, and
							high-quality food, and we're making it happen, one pani puri at a
							time!
						</p>
						<p className="text-lg text-gray-600 mb-6">
							Our platform ensures that vendors can easily source the best
							ingredients, while suppliers can expand their reach and grow their
							businesses. We're not just building a platform; we're building a
							community.
						</p>
						<p className="text-lg text-gray-600 mb-6">
							Why is this important? Because nobody wants a dodgy samosa! We're
							here to make sure your street food experience is delightful, not
							disastrous.
						</p>
						<p className="text-lg text-gray-600 italic text-center">
							And remember, a balanced diet is a samosa in each hand. 😉
						</p>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="w-full bg-gray-800 text-gray-300 py-12 mt-auto">
				<div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<h3 className="text-2xl font-bold mb-4">Why Work With V2S?</h3>
						<ul className="space-y-2">
							<li>🚀 Grow your shop with more customers and trusted suppliers</li>
							<li>🧼 Maintain hygiene and food safety standards</li>
							<li>🔎 Easily find government-approved products</li>
							<li>💡 Suppliers sell faster and reach more vendors</li>
							<li>
								🤝 Building trust and solving real problems in the street food
								ecosystem
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-2xl font-bold mb-4">Contact & Opportunities</h3>
						<ul className="space-y-2">
							<li>📈 Unlock new growth and business opportunities</li>
							<li>
								📬 Email:{" "}
								<a
									href="mailto:contact@v2s.com"
									className="underline text-amber-300"
								>
									contact@v2s.com
								</a>
							</li>
							<li>🌐 Join the movement for safer, smarter street food!</li>
						</ul>
					</div>
				</div>
				<div className="text-center text-sm text-gray-500 mt-8">
					&copy; {new Date().getFullYear()} V2S. All rights reserved.
				</div>
			</footer>
		</div>
	);
}

export default Home;