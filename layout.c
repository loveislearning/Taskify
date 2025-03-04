<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Planner</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
        }
        body {
            display: flex;
            background-color: #1e1e1e;
            color: white;
        }
        .sidebar {
            width: 280px;
            background: #2c2c2c;
            padding: 20px;
            height: 100vh;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
        }
        .sidebar h2 {
            margin-bottom: 20px;
            font-size: 20px;
        }
        .sidebar ul {
            list-style: none;
            flex-grow: 1;
        }
        .sidebar ul li {
            padding: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
            border-radius: 5px;
        }
        .sidebar ul li:hover {
            background: #444;
        }
        .main-content {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            position: relative;
        }
        .top-right-menu {
            position: absolute;
            top: 20px;
            right: 20px;
            display: flex;
            gap: 15px;
            align-items: center;
        }
        .top-right-menu button {
            background: #2c2c2c;
            border: none;
            color: white;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        }
        .top-right-menu button:hover {
            background: #444;
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <h2>Student Planner</h2>
        <ul>
            <li>🔍 Search</li>
            <li>🤖 Notion AI</li>
            <li>🏠 Home</li>
            <li>📥 Inbox</li>
            <li>📚 Class Notes</li>
            <li>🚀 Getting Started</li>
            <li>📝 Lesson Plans</li>
            <li>📅 Student Planner</li>
            <li>⚙️ Settings</li>
            <li>📂 Templates</li>
            <li>🗑️ Trash</li>
        </ul>
    </div>
    <div class="main-content">
        <div class="top-right-menu">
            <button>🔄 Change Cover</button>
            <button>🔧 Reposition</button>
            <button>✏️ Edit</button>
            <button>📤 Share</button>
        </div>
    </div>
</body>
</html>
