'use client'

import React from 'react'

function PrivacyPolicy() {
  return (
    <div className="max-w-[1440px] w-11/12 py-12 md:py-16 mx-auto text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-6">Last Updated: August 27, 2025</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Introduction</h2>
      <p>
        This Privacy Policy outlines how Task Mama ("we," "us," or "our") collects, uses,
        discloses, and safeguards your personal information when you use our mobile
        application ("App"). We are committed to ensuring the confidentiality and
        security of your personal data and maintaining transparency about our data
        practices.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <h3 className="text-xl font-semibold mt-4 mb-1">2.1 Information You Provide</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Account Information: Name, email address, and account credentials</li>
        <li>Task Data: Details about your tasks, goals, and reminders</li>
        <li>User Content: Categories, tags, notes, and other data you add to tasks</li>
        <li>Payment Information: Processed by Apple via the App Store (we do not store payment details)</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-1">2.2 Information Automatically Collected</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Usage Data: How you interact with the App, features used, time spent</li>
        <li>Device Information: Device model, operating system version, unique device identifiers</li>
        <li>Technical Data: App performance, crash reports, and error logs</li>
        <li>Location Data: General location (if granted permission) for task reminders and suggestions</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-1">2.3 Information from Third Parties</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Apple Services: Account verification and purchase information from Apple</li>
        <li>Task Management Services: Third-party services for task reminders and synchronization</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
      <h3 className="text-xl font-semibold mt-4 mb-1">3.1 Primary Uses</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Service Delivery: To process and store your tasks and provide reminder functionality</li>
        <li>Account Management: To create and maintain your account and authenticate your access</li>
        <li>Premium Features: To provide subscription-based services and features</li>
        <li>Customer Support: To respond to your inquiries and provide technical assistance</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-1">3.2 Additional Uses</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>App Improvement: To analyze usage patterns to enhance app features and performance</li>
        <li>Communication: To send service-related notifications, updates, and marketing communications (if opted in)</li>
        <li>Legal Compliance: To comply with legal obligations and protect our rights</li>
      </ul>

      {/* Continue with all other sections the same way */}

      <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Information</h2>
      <p>If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Email: support@taskmama.app</li>
        <li>Website: https://www.taskmama.app/</li>
        <li>Address: Wioletta Szczesny, 00 Foalgarth Way, Johns Creek - 30022-7165, United States (US)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Effective Date</h2>
      <p>
        This Privacy Policy is effective as of the date listed above and applies to all
        information collected by the App.
      </p>
    </div>
  )
}

export default PrivacyPolicy
