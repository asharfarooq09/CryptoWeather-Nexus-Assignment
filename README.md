# Weather & Crypto Dashboard

A modern web application that provides real-time weather information and cryptocurrency data in a sleek, dark-themed interface.

## Features

### Weather Dashboard

- Real-time weather data for multiple cities
- Detailed weather information including temperature, humidity, wind speed
- Temperature trend visualization using charts
- 3-hour forecast preview
- Favorite cities management
- Responsive design for all devices

### Crypto Dashboard

- Real-time cryptocurrency price tracking
- Detailed crypto information including market cap, volume, and price changes
- Price history visualization using charts
- Market statistics and key metrics
- Favorite cryptocurrencies management
- Responsive design for all devices

### General Features

- Dark theme with modern UI
- Real-time data updates
- Interactive charts and visualizations
- Favorites management system
- Responsive and mobile-friendly design
- Smooth animations and transitions

## Technologies Used

- Next.js
- React
- Redux Toolkit
- Chart.js
- Tailwind CSS
- WebSocket for real-time updates

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/weather-crypto-dashboard.git
cd weather-crypto-dashboard
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your API keys:

```env
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
NEXT_PUBLIC_CRYPTO_API_KEY=your_crypto_api_key
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── crypto/            # Crypto-related pages
│   ├── weather/           # Weather-related pages
│   └── page.jsx           # Main dashboard page
├── components/            # Reusable components
├── hooks/                 # Custom React hooks
├── redux/                 # Redux store and slices
├── utils/                 # Utility functions
└── styles/               # Global styles
```

## API Integration

- Weather data from OpenWeatherMap API
- Cryptocurrency data from CoinGecko API
- News data from NewsAPI

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenWeatherMap for weather data
- CoinGecko for cryptocurrency data
- NewsAPI for news data