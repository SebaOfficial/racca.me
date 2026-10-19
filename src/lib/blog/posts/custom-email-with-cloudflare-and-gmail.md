---
title: Create a Custom Email Address with Gmail and Cloudflare
description: Set up a custom email address with Cloudflare Email Routing and Gmail for free.
created: '2023-12-03'
updated: '2023-12-03'
---

## Create a Custom Email Address for Free

A custom email address gives your communication a more professional look and helps build your brand identity.

In this tutorial, you'll learn how to set up a custom email address using **Cloudflare Email Routing** and **Gmail**. By the end, you'll be able to receive emails through your own domain and send emails from your custom address, all without paying for an email hosting service.

## Prerequisites

Before getting started, make sure you have:

- An active Gmail account.
- A domain managed by Cloudflare.
- Access to your domain's DNS settings in Cloudflare.

## 1. Set Up Your Google Account

To send emails through Gmail using your custom address, you'll need to enable two-step verification and create an app password.

### Enable Two-Step Verification

If you've already enabled two-step verification, you can skip this step.

1. Open your [Google Account](https://myaccount.google.com/).
2. Select **Security** from the navigation menu.
3. Under **How you sign in to Google**, select **2-Step Verification**, then click **Get started**.
4. Follow the on-screen instructions to complete the setup.

### Create an App Password

An app password is a 16-character passcode that allows an application to access your Google Account. You'll use it to configure Gmail's SMTP settings.

1. Open the [Google App Passwords page](https://myaccount.google.com/apppasswords).
2. Enter a name for the app, such as `My Custom Email`.
3. Generate the app password and store it securely. You'll need it later.

**Note:** Google may require two-step verification to be enabled before you can create an app password.

## 2. Set Up Cloudflare Email Routing

Cloudflare Email Routing forwards emails sent to your custom address to an inbox of your choice. This lets you receive emails at your domain without hosting a separate mailbox.

### Enable Email Routing

1. Open the [Cloudflare Dashboard](https://dash.cloudflare.com/) and select your domain.
2. Navigate to **Email** → **Email Routing**, then select **Get started**.
3. Under **Custom address**, enter the address you want to use, such as `cool-email@example.com`.
4. Under **Destination address**, enter your existing Gmail address, such as `my-personal-email@gmail.com`.
5. Select **Create and Continue**, then follow the instructions sent to your destination inbox to verify the address.

### Configure Your SPF Record

An SPF record is a DNS TXT record that tells receiving mail servers which services are authorized to send email using your domain.

In this setup, Cloudflare handles incoming email forwarding, while Gmail is used to send emails from your custom address.

#### Add the SPF Record in Cloudflare

1. Open the [Cloudflare Dashboard](https://dash.cloudflare.com/) and select your domain.
2. Go to **DNS** → **Records**.
3. Look for an existing TXT record whose content starts with `v=spf1`.
4. If no SPF record exists, select **Add record** and enter the following:

   | Field   | Value                                                                |
   | ------- | -------------------------------------------------------------------- |
   | Type    | `TXT`                                                                |
   | Name    | `@`                                                                  |
   | Content | `v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all` |
   | TTL     | Auto                                                                 |

5. Save the record.

The two `include:` entries identify the services being authorized:

- `include:_spf.mx.cloudflare.net` — authorizes Cloudflare's email infrastructure.
- `include:_spf.google.com` — authorizes Google's email infrastructure.
- `~all` — marks messages from other, unauthorized senders as a soft failure.

**Important:** If you already have an SPF record, don't create a second one. Update the existing record to include the necessary services, keeping any other legitimate email senders already listed. You should have only one SPF record for your domain.

If you use Gmail's SMTP server with a personal Gmail account, this SPF record alone does not guarantee that messages sent with your custom address will pass SPF or DMARC alignment. Test your outgoing email after completing the setup.

DNS changes usually take effect within a few minutes, but propagation can sometimes take longer.

## 3. Add Your Custom Address to Gmail

Now that Cloudflare is forwarding incoming emails to Gmail, let's configure Gmail to send messages from your custom address.

1. Open [Gmail](https://mail.google.com/).
2. Select **Settings** → **See all settings**.
3. Open the **Accounts and Import** tab.
4. Under **Send mail as**, select **Add another email address**.
5. Enter the name you want recipients to see and your custom email address, such as `cool-email@example.com`.
6. Untick **Treat as an alias**, if you want Gmail to treat the custom address as a separate identity, then continue.

### Configure the SMTP Server

When prompted for the outgoing mail server details, enter the following information:

| Setting             | Value                                                           |
| ------------------- | --------------------------------------------------------------- |
| SMTP Server         | `smtp.gmail.com`                                                |
| Port                | `587`                                                           |
| Username            | Your Gmail address, such as `my-personal-email@gmail.com`       |
| Password            | The [app password you created earlier](#create-an-app-password) |
| Connection security | TLS                                                             |

Select **Add Account** to continue.

Google will send a verification email to your Gmail inbox. Open it and follow the instructions to confirm that you own the custom email address.

Once verified, your custom address should appear under **Send mail as** in Gmail settings.

## 4. Test Your Custom Email Address

You're almost done! Send a test email to another address to make sure everything works as expected.

- **Receiving emails:** Send a message to your custom address and check that it arrives in your Gmail inbox.
- **Sending emails:** Compose a new message in Gmail and select your custom address in the **From** field.
- **Replying to emails:** Check that replies use the intended sender address.

If something doesn't work, double-check your Cloudflare Email Routing configuration, DNS records, SMTP settings, and Google app password.

## Enjoy Your Custom Email Address!

That's it! You can now receive emails through Cloudflare Email Routing and send emails from your custom address using Gmail.

Whenever you compose a message, check the **From** field and select your custom address when needed.

Enjoy your new custom email address!
