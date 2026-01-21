import { useState, useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';

interface CaptchaProps {
    onVerify: (isValid: boolean) => void;
    onReset?: () => void;
}

export function Captcha({ onVerify, onReset }: CaptchaProps) {
    const [captchaCode, setCaptchaCode] = useState('');
    const [userInput, setUserInput] = useState('');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const generateCaptcha = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptchaCode(code);
        setUserInput('');
        onVerify(false);
        if (onReset) onReset();
        return code;
    };

    const drawCaptcha = (code: string) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.5, '#f0f9ff');
        gradient.addColorStop(1, '#e0f2fe');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

        for (let i = 0; i < 3; i++) {
            ctx.strokeStyle = `rgba(0, 153, 255, ${Math.random() * 0.15 + 0.05})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.bezierCurveTo(
                Math.random() * canvas.width, Math.random() * canvas.height,
                Math.random() * canvas.width, Math.random() * canvas.height,
                Math.random() * canvas.width, Math.random() * canvas.height
            );
            ctx.stroke();
        }

        ctx.font = 'bold 16px "Courier New", monospace';
        ctx.textBaseline = 'middle';

        const charWidth = canvas.width / code.length;
        for (let i = 0; i < code.length; i++) {
            ctx.save();

            const x = charWidth * i + charWidth / 2;
            const y = canvas.height / 2 + (Math.random() - 0.5) * 4;
            const rotation = (Math.random() - 0.5) * 0.3;

            ctx.translate(x, y);
            ctx.rotate(rotation);

            const charGradient = ctx.createLinearGradient(-15, -20, 15, 20);
            charGradient.addColorStop(0, '#0099ff');
            charGradient.addColorStop(1, '#0066cc');
            ctx.fillStyle = charGradient;

            ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
            ctx.shadowBlur = 3;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;

            ctx.fillText(code[i], 0, 0);
            ctx.restore();
        }

        for (let i = 0; i < 30; i++) {
            ctx.fillStyle = `rgba(100, 116, 139, ${Math.random() * 0.2})`;
            const size = Math.random() * 2 + 1;
            ctx.fillRect(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                size,
                size
            );
        }
    };

    useEffect(() => {
        const code = generateCaptcha();
        drawCaptcha(code);
    }, []);

    useEffect(() => {
        if (captchaCode) {
            drawCaptcha(captchaCode);
        }
    }, [captchaCode]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase();
        setUserInput(value);

        if (value === captchaCode) {
            onVerify(true);
        } else {
            onVerify(false);
        }
    };

    const handleRefresh = () => {
        const code = generateCaptcha();
        drawCaptcha(code);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left: Canvas with Refresh */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Verification Code</label>
                <div className="flex items-center gap-2">
                    <canvas
                        ref={canvasRef}
                        width={140}
                        height={20}
                        className="border rounded-md flex-1"
                    />
                    <button
                        type="button"
                        onClick={handleRefresh}
                        className="h-10 w-10 flex items-center justify-center text-gray-600 hover:text-[#0099ff] hover:bg-blue-50 rounded-md transition-colors border border-gray-200"
                        title="Refresh code"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Right: Input - Same style as phone field */}
            <div className="space-y-2">
                <label htmlFor="captcha-input" className="text-sm font-semibold text-gray-700">
                    Enter Code
                </label>
                <input
                    id="captcha-input"
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Enter 6-character code"
                    className="h-12 w-full border-gray-200 focus:border-[#0099ff] focus:ring-[#0099ff]/10 rounded-md border px-3 outline-none transition-all uppercase font-mono tracking-wider"
                    maxLength={6}
                    autoComplete="off"
                />
                {userInput && userInput === captchaCode && (
                    <p className="text-sm text-green-600 font-medium">✓ Verified</p>
                )}
                {userInput && userInput.length >= 6 && userInput !== captchaCode && (
                    <p className="text-sm text-red-600 font-medium">✗ Incorrect code</p>
                )}
            </div>
        </div>
    );
}

export default Captcha;
