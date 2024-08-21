# ReactWrite

Live link - https://react-write-lemon.vercel.app

ReactWrite is a powerful and user-friendly platform built with React and Django, allowing users to express themselves through posts, connect with others, and manage their profiles with ease. The project leverages modern web technologies and is deployed across Vercel and Render, with Supabase as the database.

## Features

- **JWT Authentication**: Secure authentication using JSON Web Tokens.
- **User Posts**: Create, edit, and delete posts effortlessly.
- **Social Interaction**: Like posts, follow and unfollow other profiles.
- **Profile Management**: Update your profile, including adding a profile picture.

## Tech Stack

- **Frontend**: React, deployed on [Vercel](https://vercel.com/)
- **Backend**: Django, deployed on [Render](https://render.com/)
- **Database**: [Neon Postgres](https://neon.tech/)

## Installation

### Prerequisites

- Node.js
- Python 3.x
- Neon account (or simply uncomment default sqlite database in settings.py)

### Setup Instructions

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Rhythm1821/ReactWrite.git
    cd reactwrite
    ```

2. **Frontend Setup**:

    - Navigate to the `frontend` directory and install dependencies:

        ```bash
        cd frontend
        npm install
        ```

    - Create a `.env` file in the `frontend` directory with the following variables:

        ```env
        VITE_API_URL='http://localhost:8000'
        ```

    - Start the React development server:

        ```bash
        npm run dev
        ```

3. **Backend Setup**:

    - Navigate to the `backend` directory and create a virtual environment:

        ```bash
        cd backend
        python3 -m venv venv
        source venv/bin/activate
        ```

    - Install the required Python packages:

        ```bash
        pip install -r requirements.txt
        ```

    - Create a `.env` file in the `backend` directory with the following variables (If using Neon database):

        ```env
        PGHOST=
        PGDATABASE=
        PGUSER=
        PGPASSWORD=
        ```

    - Run the Django development server:

        ```bash
        python3 manage.py migrate
        python3 manage.py runserver
        ```

## Deployment

The frontend is deployed on Vercel, and the backend is deployed on Render. For detailed deployment instructions, refer to the documentation:

- **Frontend (React)**: [Vercel Deployment Docs](https://vercel.com/docs)
- **Backend (Django)**: [Render Deployment Docs](https://render.com/docs)

## Usage

1. **Sign Up / Login**: Register or log in to access the platform.
2. **Create a Post**: Share your thoughts by creating a post.
3. **Edit / Delete a Post**: Modify or remove your posts anytime.
4. **Like / Follow**: Engage with other users by liking posts and following profiles.
5. **Profile Management**: Update your profile information and add a profile picture.

## Contact

For questions or support, please reach out at [rhythmrawat422@gmail.com](mailto:rhythmrawat422@gmail.com).
