const verifyEmail = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=DM+Sans:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        background: #fafafa;
        font-family: "Quicksand", sans-serif;
        padding: 32px 16px;
        color: #1a1a1a;
      }

      .wrap {
        max-width: 480px;
        margin: 0 auto;
        background: #fff;
        border: 1px solid #ebebeb;
        border-radius: 4px;
      }

      .accent-bar {
        height: 3px;
        background: #db2a60;
        border-radius: 4px 4px 0 0;
      }

      .body {
        padding: 32px 36px 28px;
      }

      .logo-area {
        margin-bottom: 24px;
      }

      .logo-placeholder {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border: 1.5px dashed #ccc;
        border-radius: 6px;
        font-size: 10px;
        color: #666;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        line-height: 1.3;
        text-align: center;
      }

      .logo-img {
        max-height: 40px;
        max-width: 160px;
        object-fit: contain;
      }

      .label {
        font-size: 11px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #db2a60;
        font-weight: 500;
        margin-bottom: 8px;
      }

      h1 {
        font-size: 24px;
        font-weight: 600;
        color: #111;
        line-height: 1.3;
        margin-bottom: 14px;
      }

      .message {
        font-size: 14.5px;
        color: #333;
        line-height: 1.75;
        margin-bottom: 24px;
      }

      .btn {
        display: inline-block;
        background: #db2a60;
        color: #fff;
        text-decoration: none;
        font-family: "DM Sans", sans-serif;
        font-size: 13.5px;
        font-weight: 500;
        letter-spacing: 0.04em;
        padding: 13px 32px;
        border-radius: 3px;
        margin-bottom: 20px;
      }

      .divider {
        border: none;
        border-top: 1px solid #f0f0f0;
        margin: 20px 0;
      }

      .fallback {
        font-size: 12.5px;
        color: #777;
        line-height: 1.7;
      }

      .fallback a {
        color: #db2a60;
        word-break: break-all;
      }

      .expiry {
        margin-top: 14px;
        font-size: 12px;
        color: #666;
      }

      .footer {
        border-top: 1px solid #f0f0f0;
        padding: 14px 36px;
        font-size: 11.5px;
        color: #666;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
      }

      .footer a {
        color: #666;
        text-decoration: none;
      }
      .footer a:hover {
        color: #db2a60;
      }

      .author-link:link,
      .author-link:visited {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="accent-bar"></div>

      <div class="body">
        <div class="logo-area">
          <img src="[APP_LOGO]" alt="Memory Map logo" class="logo-img" />
        </div>

        <p class="label">Email Verification</p>
        <h1>Confirm your email address</h1>

        <p class="message">
          Hi <strong>[USER_NAME]</strong>, thanks for signing up.<br />
          Click the button below to verify your email and activate your account.
        </p>

        <a href="[VERIFICATION_URL]" class="btn">Verify Email</a>

        <hr class="divider" />

        <p class="fallback">
          Button not working? Copy this link into your browser:<br />
          <a href="[VERIFICATION_URL]">[VERIFICATION_URL]</a>
        </p>

        <p class="expiry">
          ⏱ Link expires in 10 minutes &nbsp;·&nbsp; Didn't sign up? You can
          safely ignore this.
        </p>
      </div>

      <div class="footer">
        <span>© [CURRENT_YEAR] Memory Map</span>
        <span
          >Created by
          <a
            href="https://www.linkedin.com/in/tejasavkhandelwal/"
            target="_blank"
            class="author-link"
            >Tejasva Khandelwal</a
          ></span
        >
      </div>
    </div>
  </body>
</html>

`;

export default verifyEmail;
