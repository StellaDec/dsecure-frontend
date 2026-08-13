import React, { useEffect } from 'react';
import { SEOHeadNative } from '@/components/SEOHeadNative';
import { getSEOForPage } from '../utils/seo';
import { Cookie } from 'lucide-react';

/*
// Data for cookie tables
const necessaryCookies = [
  { name: 'LS_CSRF_TOKEN', duration: 'session', description: 'Cloudflare sets this cookie to track users’ activities across multiple websites. It expires once the browser is closed.' },
  { name: 'li_gc', duration: '6 months', description: 'Linkedin set this cookie for storing visitor\'s consent regarding using cookies for non-essential purposes.' },
  { name: 'zalb_*', duration: 'session', description: 'Zoho sets this cookie for load balancing and session stickiness. It ensures that user requests are consistently directed to the same server during a session, helping maintain session integrity and improving website performance.' },
  { name: 'rc::a', duration: 'Never Expires', description: 'This cookie is set by the Google recaptcha service to identify bots to protect the website against malicious spam attacks.' },
  { name: 'rc::c', duration: 'session', description: 'This cookie is set by the Google recaptcha service to identify bots to protect the website against malicious spam attacks.' },
  { name: 'ci_session', duration: '2 hours', description: 'This cookie is set as default session Cookie name in config.php in config folder in CodeIgniter.' },
  { name: 'wpEmojiSettingsSupports', duration: 'session', description: 'WordPress sets this cookie when a user interacts with emojis on a WordPress site. It helps determine if the user\'s browser can display emojis properly.' },
  { name: 'PHPSESSID', duration: 'session', description: 'This cookie is native to PHP applications. The cookie stores and identifies a user\'s unique session ID to manage user sessions on the website. The cookie is a session cookie and will be deleted when all the browser windows are closed.' },
  { name: 'XSRF-TOKEN', duration: '2 hours', description: 'This cookie enhances visitor browsing security by preventing cross-site request forgery.' },
  { name: 'laravel_session', duration: '2 hours', description: 'laravel uses laravel_session to identify a session instance for a user, this can be changed' },
  { name: 'wb-p-SERVER', duration: 'session', description: 'This cookie is set by the website’s server to manage session routing and ensure stable performance and load balancing.' },
  { name: 'fp_id', duration: 'session', description: 'Stores a unique visitor ID for security purposes.' },
  { name: 'cf_use_ob', duration: '1 minute', description: 'Cloudflare sets this cookie to improve page load times and to disallow any security restrictions based on the visitor\'s IP address.' },
  { name: 'cf_ob_info', duration: '1 minute', description: 'The cf_ob_info cookie is set by Cloudflare to provide information on HTTP Status Code returned by the origin web server, the Ray ID of the original failed request and the data center serving the traffic.' },
  { name: 'cookieyes-consent', duration: '1 year', description: 'CookieYes sets this cookie to remember users\' consent preferences so that their preferences are respected on subsequent visits to this site. It does not collect or store any personal information about the site visitors.' },
  { name: 'VISITOR_PRIVACY_METADATA', duration: '6 months', description: 'YouTube sets this cookie to store the user\'s cookie consent state for the current domain.' },
  { name: 'AWSALBCORS', duration: '7 days', description: 'Amazon Web Services set this cookie for load balancing.' }
];

const functionalCookies = [
  { name: 'crmcsr', duration: 'session', description: 'A Zoho CRM session cookie that helps manage and secure the user session.' },
  { name: 'lidc', duration: '1 day', description: 'LinkedIn sets the lidc cookie to facilitate data center selection.' },
  { name: 'uesign', duration: '1 month', description: 'Zoho sets this cookie for the Visitor Live Chat.' },
  { name: '_zcsr_tmp', duration: 'session', description: 'Zoho sets this cookie for the login function on the website.' },
  { name: 'VISITOR_INFO1_LIVE', duration: '6 months', description: 'A cookie set by YouTube to measure bandwidth that determines whether the user gets the new or old player interface.' },
  { name: 'yt-remote-connected-devices', duration: 'Never Expires', description: 'YouTube sets this cookie to store the user\'s video preferences using embedded YouTube videos.' },
  { name: 'yt-remote-device-id', duration: 'Never Expires', description: 'YouTube sets this cookie to store the user\'s video preferences using embedded YouTube videos.' },
  { name: 'ytidb::LAST_RESULT_ENTRY_KEY', duration: 'Never Expires', description: 'The cookie ytidb::LAST_RESULT_ENTRY_KEY is used by YouTube to store the last search result entry that was clicked by the user. This information is used to improve the user experience by providing more relevant search results in the future.' },
  { name: 'yt-remote-session-name', duration: 'session', description: 'The yt-remote-session-name cookie is used by YouTube to store the user\'s video player preferences using embedded YouTube video.' },
  { name: 'yt-remote-fast-check-period', duration: 'session', description: 'The yt-remote-fast-check-period cookie is used by YouTube to store the user\'s video player preferences for embedded YouTube videos.' },
  { name: 'yt-remote-session-app', duration: 'session', description: 'The yt-remote-session-app cookie is used by YouTube to store user preferences and information about the interface of the embedded YouTube video player.' },
  { name: 'yt-remote-cast-available', duration: 'session', description: 'The yt-remote-cast-available cookie is used to store the user\'s preferences regarding whether casting is available on their YouTube video player.' },
  { name: 'yt-remote-cast-installed', duration: 'session', description: 'The yt-remote-cast-installed cookie is used to store the user\'s video player preferences using embedded YouTube video.' }
];

const analyticsCookies = [
  { name: '_ga_*', duration: '1 year 1 month 4 days', description: 'Google Analytics sets this cookie to store and count page views.' },
  { name: '_ga', duration: '1 year 1 month 4 days', description: 'Google Analytics sets this cookie to calculate visitor, session and campaign data and track site usage for the site\'s analytics report. The cookie stores information anonymously and assigns a randomly generated number to recognise unique visitors.' },
  { name: 'siqlsdb', duration: 'Never Expires', description: 'Zoho sets this cookie to generate a unique ID for the session. This allows the website to obtain data on visitor behaviour for statistical purposes.' },
  { name: 'utsdb', duration: 'session', description: 'Zoho SalesIQ sets this cookie to register data on visitor\'s website behaviour.' },
  { name: '_gid', duration: '1 day', description: 'Google Analytics sets this cookie to store information on how visitors use a website while also creating an analytics report of the website\'s performance. Some of the collected data includes the number of visitors, their source, and the pages they visit anonymously.' },
  { name: 'YSC', duration: 'session', description: 'YSC cookie is set by Youtube and is used to track the views of embedded videos on Youtube pages.' },
  { name: '_hjSessionUser_*', duration: '1 year', description: 'Hotjar sets this cookie to ensure data from subsequent visits to the same site is attributed to the same user ID, which persists in the Hotjar User ID, which is unique to that site.' },
  { name: '_hjSession_*', duration: '1 hour', description: 'Hotjar sets this cookie to ensure data from subsequent visits to the same site is attributed to the same user ID, which persists in the Hotjar User ID, which is unique to that site.' }
];

const performanceCookies = [
  { name: '_uetsid', duration: '1 day', description: 'Bing Ads sets this cookie to engage with a user that has previously visited the website.' },
  { name: '_uetvid', duration: '1 year 24 days', description: 'Bing Ads sets this cookie to engage with a user that has previously visited the website.' },
  { name: '_gat', duration: '1 minute', description: 'Google Universal Analytics sets this cookie to restrain request rate and thus limit data collection on high-traffic sites.' }
];

const advertisementCookies = [
  { name: 'gclid', duration: '1 month', description: 'This cookie is used by Google Ads to store the Google Click Identifier (GCLID), which helps track ad campaign performance and attribute conversions to ads that users clicked on.' },
  { name: '_gcl_au', duration: '3 months', description: 'Google Tag Manager sets this cookie to experiment advertisement efficiency of websites using their services.' },
  { name: 'bcookie', duration: '1 year', description: 'LinkedIn sets this cookie from LinkedIn share buttons and ad tags to recognize browser IDs.' },
  { name: 'MUID', duration: '1 year 24 days', description: 'Bing sets this cookie to recognise unique web browsers visiting Microsoft sites. This cookie is used for advertising, site analytics, and other operations.' },
  { name: '__Secure-YNID', duration: '6 months', description: 'Description is currently not available.' },
  { name: '__Secure-ROLLOUT_TOKEN', duration: '6 months', description: 'This cookie is set by YouTube to manage user interaction and personalize video recommendations and advertisements across YouTube services.' },
  { name: '__Secure-YEC', duration: 'past', description: 'YouTube cookie for tracking and personalized ads.' }
];

const CookieTable = ({ cookies }: { cookies: { name: string, duration: string, description: string }[] }) => (
  <div className="overflow-x-auto mt-4">
    <div className="border border-[#d0d5dc]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#d0d5dc] bg-slate-50">
            <th className="text-left p-4 font-semibold text-slate-900 w-[20%]">Cookie</th>
            <th className="text-left p-4 font-semibold text-slate-900 w-[15%]">Duration</th>
            <th className="text-left p-4 font-semibold text-slate-900 w-[65%]">Description</th>
          </tr>
        </thead>
        <tbody>
          {cookies.map((cookie, index) => (
            <tr
              key={index}
              className={index < cookies.length - 1 ? 'border-b border-[#d0d5dc]' : ''}
            >
              <td className="p-4 text-slate-800 font-mono text-xs">{cookie.name}</td>
              <td className="p-4 text-slate-800">{cookie.duration}</td>
              <td className="p-4 text-slate-800">{cookie.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
*/

const CookiePolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHeadNative seo={getSEOForPage('cookie-policy')} />

      <div className="min-h-screen bg-white pt-24 pb-12 text-left">
        <div className="container-responsive">
          <div className="max-w-5xl mx-auto">
            {/* ── Header ── */}
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0e7c66] mb-6 rounded-none">
                <Cookie className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                Cookie Policy
              </h1>
              <div className="text-sm font-semibold text-[#0e7c66] tracking-wider uppercase mb-6 flex flex-col gap-1">
                <span>Effective Date: October 4, 2025</span>
                <span>Last Updated: August 4, 2026</span>
              </div>
            </div>

            {/* ── Content ── */}
            <div className="py-4">
              {/* 1. What are cookies? */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                  What are cookies?
                </h2>
                <div className="space-y-4 text-slate-800">
                  <p className="leading-relaxed">
                    Cookies are simple text files that are stored on your computer or mobile device by a website’s server. Each cookie is unique to your web browser. It will contain some anonymous information such as a unique identifier, website’s domain name, and some digits and numbers.
                  </p>
                </div>
              </section>

              {/* 2. Types of cookies we use */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                  What types of cookies do we use?
                </h2>
                
                <div className="space-y-10 mt-6">
                  {/* Necessary */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Necessary cookies</h3>
                    <p className="text-slate-800 leading-relaxed mb-4">
                      Necessary cookies allow us to offer you the best possible experience when accessing and navigating through our website and using its features. For example, these cookies let us recognize that you have created an account and have logged into that account to access the content.
                    </p>
                  </div>

                  {/* Functionality */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Functionality cookies</h3>
                    <p className="text-slate-800 leading-relaxed mb-4">
                      Functionality cookies let us operate the site in accordance with the choices you make. For example, we will recognize your username and remember how you customized the site during future visits.
                    </p>
                  </div>

                  {/* Analytics */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Analytical cookies</h3>
                    <p className="text-slate-800 leading-relaxed mb-4">
                      These cookies enable us and third-party services to collect aggregated data for statistical purposes on how our visitors use the website. These cookies do not contain personal information such as names and email addresses and are used to help us improve your user experience of the website.
                    </p>
                  </div>

                  {/* Marketing */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Marketing cookies</h3>
                    <p className="text-slate-800 leading-relaxed mb-4">
                      Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers. These are also used in context with email marketing services, which allow the website to target visitors via email.
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. How to delete cookies? */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-[#d0d5dc]">
                  How to delete cookies?
                </h2>
                
                <div className="space-y-4 text-slate-800 mt-6">
                  <p className="leading-relaxed">
                    If you want to restrict or block the cookies that are set by our website, you can do so through your browser setting. Alternatively, you can visit <a href="https://www.internetcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#0e7c66] hover:underline font-semibold">www.internetcookies.org</a>, which contains comprehensive information on how to do this on a wide variety of browsers and devices. You will find general information about cookies and details on how to delete cookies from your device.
                  </p>
                </div>
              </section>

              {/* Footer text */}
              {/* <div className="mt-12 pt-6 border-t border-[#d0d5dc] text-sm text-slate-500 text-center flex flex-col gap-2">
                <p>Cookie Policy generated by CookieYes - Cookie Policy Generator</p>
              </div> */}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicyPage;