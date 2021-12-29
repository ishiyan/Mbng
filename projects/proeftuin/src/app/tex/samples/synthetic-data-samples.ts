import { Sample } from './sample';

export const syntheticDataSamples: Sample[] =
  [
    {
      name: 'Geometric Brownian Motion - 1',
      code: 'mid_t=mid_0\\exp((\\mu-\\frac{\\sigma^2}{2})t+\\sigma\\sqrt{dt}\\cdot ng),'
    },
    {
      name: 'Geometric Brownian Motion - 2',
      code: 'mid_0=\\beta+\\frac{\\alpha}{2},'
    },
    {
      name: 'Geometric Brownian Motion - 3',
      code: 'dt=\\frac{1}{L - 1},'
    },
    {
      name: 'Geometric Brownian Motion - 4',
      code: 'mid_t\\ is\\ normalized\\ to\\ [\\beta, \\alpha+\\beta],'
    },
    {
      name: 'Geometric Brownian Motion - 5',
      code: 'sample_t=mid_t+noise_t'
    },
    {
      name: 'Fractional Brownian Motion - 1',
      code: 'mid_t=\\alpha\\cdot fBm_t(H, ng, seed)+\\beta,'
    },
    {
      name: 'Fractional Brownian Motion - 2',
      code: 'sample_t=mid_t+noise_t'
    },
    {
      name: 'Chirp - 1',
      code: 'mid_t=\\alpha\\cdot\\cos(sweep_t\\cdot t+\\varphi\\cdot\\pi)+\\beta,'
    },
    {
      name: 'Chirp - 2',
      code: 'sweep_1=\\frac{2\\pi}{\\lambda_1},'
    },
    {
      name: 'Chirp - 3',
      code: 'sweep_L=\\frac{2\\pi}{\\lambda_L},'
    },
    {
      name: 'Chirp - 4',
      code: 'sample_t=mid_t+noise_t'
    },
    {
      name: 'Sawtooth - 1',
      code: 'mid_t=\\alpha\\cdot shape_t\\cdot t+\\beta,'
    },
    {
      name: 'Sawtooth - 2',
      code: 'sample_t=mid_t+noise_t'
    },
    {
      name: 'Sinusoidal - 1',
      code: 'mid_t=\\alpha\\cdot\\cos(\\frac{2\\pi}{\\lambda}t+\\varphi\\cdot\\pi)+\\beta,'
    },
    {
      name: 'Sinusoidal - 2',
      code: 'sample_t=mid_t+noise_t'
    },
    {
      name: 'Square - 1',
      code: 'mid_t=\\left\\{\\begin{array}{rl}\\alpha+\\beta&t\\in [1, \\lambda]\\\\\\beta&t\\in [\\lambda+1, 2\\lambda]\\end{array}\\right.,' // eslint-disable-line
    },
    {
      name: 'Square - 2',
      code: 'sample_t=mid_t+noise_t'
    },
    {
      name: 'Ohlcv - 1',
      code: '(high,low)_t=mid_t\\cdot (1 \\pm ρ_s),'
    },
    {
      name: 'Ohlcv - 2',
      code: '(open,close)_t=mid_t\\cdot (1 \\pm ρ_b),'
    },
    {
      name: 'Ohlcv - 3',
      code: 'v_t=\\nu=const,'
    },
    {
      name: 'Ohlcv - 4',
      code: 'ρ_b\\in [0, ρ_s]'
    },
    {
      name: 'Quote - 1',
      code: '(ask, bid)_t=mid_t\\cdot (1 \\pm ρ_s),'
    },
    {
      name: 'Quote - 2',
      code: '(ask size, bid size)_t=(α_s, β_s)=const'
    },
    {
      name: 'waveform',
      code: 'noise_t=mid_t\\cdot ρ_n\\cdot random(seed)'
    }
  ];
