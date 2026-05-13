# Technical Talk Summit

A single-page web application for a 1-day technical event, featuring a dynamic schedule of 6 talks, transitions, and a lunch break.

## Features

- **Dynamic Schedule**: Automatically calculates and displays timings starting from 10:00 AM.
- **Single Track**: 6 one-hour talks with 10-minute transitions between them.
- **Lunch Break**: A scheduled 1-hour lunch break after the third talk.
- **Category Filtering**: A dropdown menu to filter talks based on their categories (e.g., AI, Web Dev, Security).
- **Responsive Design**: Mobile-friendly layout using modern CSS.

## Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Data**: JSON-based storage

## Project Structure

```text
├── data/
│   └── talks.json      # Event data (talks, speakers, categories)
├── public/
│   ├── index.html      # Main page structure
│   ├── style.css       # Responsive styling
│   └── script.js      # Frontend logic (fetching, rendering, filtering)
├── server.js           # Express server setup
├── package.json        # Project dependencies and metadata
└── .gitignore          # Git ignore rules
```

## Getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1. Clone the repository (or download the source code):
   ```bash
   git clone https://github.com/FLAPJVCK/flapjvck-event-talks-app.git
   cd flapjvck-event-talks-app
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the server:
   ```bash
   node server.js
   ```

2. Open your web browser and navigate to:
   `http://localhost:3000`

## Event Timing Details

- **Start Time**: 10:00 AM
- **Talk Duration**: 1 Hour
- **Transition Time**: 10 Minutes
- **Lunch Break**: 1 Hour (After 3rd Talk)
