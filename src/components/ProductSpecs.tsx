import Container from "./Container";

export default function ProductSpecs() {
    return (
        <section className="py-20 bg-slate-900/30">
            <Container>
                <div className="text-center mb-16">
                    <div className="text-emerald-400 font-semibold tracking-wider mb-2">PRODUCT LINEUP</div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
                        Choose Your AirVent
                    </h2>
                    <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
                        환경에 맞는 최적의 디바이스를 선택하고 AirVent DePIN 네트워크에 참여하세요.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* AirVent Pro */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-8 backdrop-blur hover:border-emerald-500/50 transition duration-300">
                        <div className="text-xs font-bold text-emerald-500 mb-2">HOME & OFFICE</div>
                        <h3 className="text-2xl font-bold text-slate-100 mb-4">AirVent Pro</h3>
                        <div className="h-40 bg-slate-900/50 rounded-xl mb-6 flex items-center justify-center border border-slate-800">
                            <span className="text-slate-600 font-medium">Device Image</span>
                        </div>

                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center text-slate-300">
                                <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                4.3 inch Touch Screen / Real-time Monitoring
                            </li>
                            <li className="flex items-center text-slate-300">
                                <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                PM1.0, PM2.5, PM10, CO2, TVOC, 온습도
                            </li>
                            <li className="flex items-center text-slate-300">
                                <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Wi-Fi 6 Mesh Network Support
                            </li>
                            <li className="flex items-center text-slate-300">
                                <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Earn Crypto Tokens Daily
                            </li>
                        </ul>

                        <button className="w-full py-3 rounded-xl bg-slate-800 text-slate-200 font-semibold hover:bg-slate-700 transition">
                            View Details
                        </button>
                    </div>

                    {/* AirVent Titan */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-8 backdrop-blur relative overflow-hidden group hover:border-purple-500/50 transition duration-300">
                        <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                            HIGH PERFORMANCE
                        </div>
                        <div className="text-xs font-bold text-purple-400 mb-2">INDUSTRIAL & LARGE SPACE</div>
                        <h3 className="text-2xl font-bold text-slate-100 mb-4">AirVent Titan</h3>
                        <div className="h-40 bg-slate-900/50 rounded-xl mb-6 flex items-center justify-center border border-slate-800">
                            <span className="text-slate-600 font-medium">Device Image</span>
                        </div>

                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center text-slate-300">
                                <svg className="w-5 h-5 text-purple-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                7 inch Touch Screen / Real-time Monitoring
                            </li>
                            <li className="flex items-center text-slate-300">
                                <svg className="w-5 h-5 text-purple-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                PM1.0, PM2.5, PM10, CO2, TVOC, 온습도
                            </li>
                            <li className="flex items-center text-slate-300">
                                <svg className="w-5 h-5 text-purple-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Wi-Fi 6 Mesh Network Support
                            </li>
                            <li className="flex items-center text-slate-300">
                                <svg className="w-5 h-5 text-purple-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span className="text-purple-400 font-bold">Earn Crypto Tokens Daily (2x Rewards)</span>
                            </li>
                        </ul>
                        <button className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-500 transition shadow-lg shadow-purple-500/20">
                            Pre-order Titan
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
}
