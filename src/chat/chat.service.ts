import { Injectable, Logger } from '@nestjs/common';
import * as rawData from '../data/mlas.json';
interface MlaRecord {
  content: string;
  source: string;
}
@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private readonly mlas: MlaRecord[];
  constructor() {
    const data = (rawData as any).default ?? rawData;
    this.mlas = Array.isArray(data) ? data : Object.values(data);
    console.log('✅ MLA records loaded:', this.mlas.length);
  }
  getAnswer(question: string, lang: string = 'English'): string {
    const q = question.trim().toLowerCase();
    console.log('📩 Question:', q);
  if (['portal available', '24 hours', 'anytime', '24/7', 'എപ്പോഴും ഉപയോഗിക്കാം','can i complaint in night','complaints at any time','complaint at any time','midnight complaint', 'after office hours', 'ഓഫീസ് സമയം കഴിഞ്ഞ്', 'രാത്രി ഫയൽ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA 24/7 ലഭ്യമാണ്. ഓഫീസ് സമയം കഴിഞ്ഞും, ഉച്ചഭക്ഷണ ഇടവേളയിലും, അവധി ദിവസങ്ങളിലും പരാതി ഫയൽ ചെയ്യാം. MLA ഓഫീസ് ടീം അടുത്ത ദിവസം ഇത് പ്രോസസ്സ് ചെയ്യും.'
    : 'EnteMLA is available 24/7. You can file complaints after office hours, during lunch breaks, or on holidays. The MLA office team will process it on the very next working day.';
  }
  if (['contact mla directly','can i contact mla','talk to mla','mla contact','directly contact mla','എംഎൽഎയെ ബന്ധപ്പെടുക','mlaയെ നേരിട്ട് ബന്ധപ്പെടാൻ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'അതെ, EnteMLA പ്ലാറ്റ്‌ഫോമിലൂടെ നിങ്ങൾക്ക് MLA ഓഫീസുമായി നേരിട്ട് ബന്ധപ്പെടാം.'
    : 'Yes, you can contact the MLA office directly through the EnteMLA platform.';
  }
    if (
    ['hi', 'hello', 'hey', 'hai', 'hay', 'നമസ്കാരം', 'ഹലോ', 'good morning', 'good evening']
    .some(w => q.toLowerCase().split(/\s+/).includes(w))) {return lang === 'Malayalam'
        ? 'നമസ്കാരം! 😊 ഞാൻ EnteMLA-യുടെ സഹായി ആണ്. താങ്കൾക്ക് എന്ത് സഹായം വേണം?'
        : 'Hello! 😊 I\'m the EnteMLA Assistant. How can I help you today?';
    }
    if (['thank', 'നന്ദി'].some(w => q.includes(w))) {return lang === 'Malayalam'? 'സന്തോഷം! 😊 മറ്റ് ചോദ്യങ്ങൾ ഉണ്ടെങ്കിൽ ചോദിക്കാം.': 'You\'re welcome! 😊 Feel free to ask anything else.';}
    if (['bye', 'goodbye', 'see you', 'പോകട്ടെ', 'താങ്ക്സ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'ശരി, പോകട്ടെ! 👋 EnteMLA എപ്പോഴും സഹായത്തിന് തയ്യാർ.': 'Goodbye! 👋 EnteMLA is always here to help you.';
    } 
    if (['what is entemla', 'about entemla', 'എന്താണ് entemla'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'EnteMLA കേരളത്തിലെ പൗരന്മാർക്ക് MLA-യ്ക്ക് നേരിട്ട് പരാതി നൽകാനുള്ള സൗജന്യ പോർട്ടൽ ആണ്.'
        : 'EnteMLA is a free citizen grievance portal to register complaints directly to your MLA online.';
    }
    if (['who made', 'who built', 'who created', 'who developed', 'corestone'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'EnteMLA നിർമ്മിച്ചത് Corestone Innovations ആണ്.': 'EnteMLA is designed and developed by Corestone Innovations.';
    }
    if (['book appointment','mla appointment','meet mla','appointment with mla','schedule meeting','in-person meeting','visit mla office','mla meeting request','എംഎൽഎയെ കാണണം','എംഎൽഎ അപ്പോയിന്റ്മെന്റ്','കൂടിക്കാഴ്ച','എംഎൽഎ മീറ്റിംഗ്','നേരിട്ട് കാണണം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'MLA ഓഫീസ് ഈ സൗകര്യം സജ്ജമാക്കിയിട്ടുണ്ടെങ്കിൽ, EnteMLA വഴി പ്രശ്നം സമർപ്പിച്ച് നേരിട്ടുള്ള കൂടിക്കാഴ്ചയ്ക്കായി അപേക്ഷിക്കാം. അപേക്ഷ പരിശോധിച്ച ശേഷം MLA ഓഫീസ് സമയം, തീയതി തുടങ്ങിയ വിവരങ്ങളുമായി നിങ്ങളെ ബന്ധപ്പെടും.'
    : 'Yes. If the MLA office provides appointment support through EnteMLA, users can request an in-person meeting by submitting their issue and selecting the appropriate category. The MLA office may contact you with appointment details after reviewing the request.';
    }
    if (['drainage blocked','drainage overflow','water logging','sewage overflow','drain blocked','rain water issue','overflowing drainage','drainage complaint','ഡ്രെയിനേജ് തടസ്സം','ഓട തടസ്സം',
  'വെള്ളക്കെട്ട്','മഴവെള്ള പ്രശ്നം','ചാലൊഴുക്ക് തടസ്സം','ഡ്രെയിനേജ് നിറഞ്ഞു'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'മഴ കാരണം ഡ്രെയിനേജ് തടസ്സപ്പെടൽ, വെള്ളക്കെട്ട്, മലിനജല ഒഴുക്ക് തുടങ്ങിയ പ്രശ്നങ്ങൾ "PWD / Drainage" അല്ലെങ്കിൽ "Administrative / Others" കാറ്റഗറിയിൽ ഫോട്ടോയും സ്ഥല വിവരവും ഉൾപ്പെടുത്തി ഫയൽ ചെയ്യുക. അടിയന്തിര സാഹചര്യങ്ങളിൽ തദ്ദേശ സ്ഥാപനത്തെയും ബന്ധപ്പെടുക.'
    : 'Blocked drainage systems, waterlogging, or sewage overflow caused by rain can be reported under "PWD / Drainage" or "Administrative / Others" category with photos and location details. In urgent situations, also contact the local authority directly.';
    }
    if (['character certificate','caste certificate','income certificate','certificate signed by mla','mla signature',
  'document attestation','recommendation letter','സർട്ടിഫിക്കറ്റ്','ക്യാരക്ടർ സർട്ടിഫിക്കറ്റ്','ജാതി സർട്ടിഫിക്കറ്റ്','വരുമാന സർട്ടിഫിക്കറ്റ്','MLA ഒപ്പ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ജാതി സർട്ടിഫിക്കറ്റ്, വരുമാന സർട്ടിഫിക്കറ്റ് തുടങ്ങിയ ഔദ്യോഗിക രേഖകൾ സാധാരണയായി Village Office / Taluk Office വഴിയാണ് ലഭിക്കുക. MLA ശുപാർശയോ ഒപ്പോ ആവശ്യമായ കാര്യങ്ങൾ ഉണ്ടെങ്കിൽ EnteMLA വഴി അപേക്ഷയോ സഹായ അഭ്യർത്ഥനയോ സമർപ്പിക്കാം. അന്തിമ അംഗീകാരം ബന്ധപ്പെട്ട സർക്കാർ വകുപ്പിന്റെ ചട്ടങ്ങൾ അനുസരിച്ചായിരിക്കും.'
    : 'Official documents such as caste certificates, income certificates, or character certificates are usually issued through the Village Office or Taluk Office. If MLA recommendation or support is required, you may submit a request through EnteMLA. Final approval depends on the rules of the concerned government department.';
  }
    if (['scholarship','educational aid','student financial help','mla scholarship','education support','study assistance','വിദ്യാഭ്യാസ സ്കോളർഷിപ്പ്','സ്കോളർഷിപ്പ്',
    'വിദ്യാഭ്യാസ സഹായം','വിദ്യാർത്ഥി ധനസഹായം','MLA scholarship'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'പ്രാദേശിക വിദ്യാഭ്യാസ സ്കോളർഷിപ്പ് അല്ലെങ്കിൽ വിദ്യാർത്ഥി ധനസഹായ പദ്ധതികൾ MLA ഓഫീസ്, ജില്ലാ ഭരണകൂടം, അല്ലെങ്കിൽ സർക്കാർ വകുപ്പുകൾ വഴി സമയാനുസരണം പ്രഖ്യാപിക്കപ്പെടാം. നിലവിൽ ലഭ്യമായ പദ്ധതികൾ അറിയാൻ EnteMLA വഴി ചോദ്യം സമർപ്പിക്കുകയോ MLA ഓഫീസുമായി നേരിട്ട് ബന്ധപ്പെടുകയോ ചെയ്യാം.'
    : 'Educational scholarships or student financial assistance schemes may be announced periodically through the MLA office, district administration, or government departments. To know about currently available schemes, you can submit an enquiry through EnteMLA or contact the MLA office directly.';
  }
  if (['housing scheme','house scheme','housing eligibility','government housing','life mission','pmay','വീട് പദ്ധതി','ഭവന പദ്ധതി','ലൈഫ് മിഷൻ',
  'വീട് ലഭിക്കുമോ','ഹൗസിംഗ് സ്കീം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'പുതിയ ഭവന പദ്ധതികളിൽ (ഉദാ: LIFE Mission, PMAY) അർഹത വരുമാനം, ഭൂമി/വീട് ഉടമസ്ഥാവകാശം, കുടുംബ സ്ഥിതി തുടങ്ങിയ മാനദണ്ഡങ്ങൾ അടിസ്ഥാനമാക്കിയാണ് നിശ്ചയിക്കുന്നത്. അർഹത പരിശോധിക്കാൻ പഞ്ചായത്ത് / മുനിസിപ്പാലിറ്റി ഓഫീസുമായി ബന്ധപ്പെടുകയോ EnteMLA വഴി സഹായ അഭ്യർത്ഥന സമർപ്പിക്കുകയോ ചെയ്യാം.'
    : 'Eligibility for housing schemes such as LIFE Mission or PMAY is determined based on factors like income, land or house ownership, and family status. You can contact your local Panchayat/Municipality office or submit a support request through EnteMLA to verify your eligibility.';
  }
    if (['government site','സർക്കാർ','government','run by','കേരള സർക്കാർ ഔദ്യോഗിക വെബ്സൈറ്റ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'EnteMLA ആപ്ലിക്കേഷൻ രൂപകൽപ്പന ചെയ്തും നിർമ്മിച്ചതും "Corestone Innovations" ആണ്. അത്യാധുനിക സാങ്കേതികവിദ്യയിലൂടെ പൗരന്മാർക്കും ജനപ്രതിനിധികൾക്കും ഇടയിലുള്ള ആശയവിനിമയം എളുപ്പമാക്കുകയാണ് ഞങ്ങളുടെ ലക്ഷ്യം.'
        : 'EnteMLA is proudly designed and developed by Corestone Innovations. Our vision is to bridge the gap between citizens and their representatives using modern, reliable technology solutions.';
    }
    if (['government pension', 'pension scheme', 'apply pension', 'widow pension', 'പെൻഷൻ', 'വിധവ പെൻഷൻ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'സർക്കാർ പെൻഷൻ പദ്ധതികൾ, വിധവ പെൻഷൻ തുടങ്ങിയവയ്ക്ക് അപേക്ഷിക്കുന്നതിനുള്ള സഹായം MLA ഓഫീസിലൂടെ ലഭ്യമാണ്. "Administrative / Others" കാറ്റഗറിയിൽ പരാതി അല്ലെങ്കിൽ അപേക്ഷ സമർപ്പിക്കാം.'
    : 'Support for applying to government pension schemes, including widow pension, can be requested through the MLA office under the "Administrative / Others" category.';
}
if (['medical aid', 'treatment help', 'financial aid for treatment', 'medical assistance', 'ചികിത്സ സഹായം', 'മെഡിക്കൽ സഹായം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ചികിത്സയ്ക്കുള്ള ധനസഹായം ആവശ്യപ്പെട്ട് "Health" കാറ്റഗറിയിൽ അപേക്ഷ സമർപ്പിക്കാം. ആവശ്യമായ മെഡിക്കൽ രേഖകൾ ചേർക്കുക.'
    : 'You can request financial assistance for medical treatment under the "Health" category. Attach relevant medical documents if available.';
}
if (['school fee', 'education support', 'student fee help', 'സ്കൂൾ ഫീസ്', 'വിദ്യാഭ്യാസ സഹായം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'സ്കൂൾ ഫീസ് അല്ലെങ്കിൽ വിദ്യാഭ്യാസ സഹായം ആവശ്യപ്പെട്ട് "Education" കാറ്റഗറിയിൽ അപേക്ഷ സമർപ്പിക്കാം.'
    : 'Requests for school fee assistance or educational support can be submitted under the "Education" category.';
}
if (['ration card correction', 'ration card issue', 'ration complaint', 'റേഷൻ കാർഡ്', 'റേഷൻ പ്രശ്നം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'റേഷൻ കാർഡ് തിരുത്തൽ, പേരിലെ പിശക്, വിലാസ പ്രശ്നങ്ങൾ എന്നിവ "Administrative / Others" കാറ്റഗറിയിൽ റിപ്പോർട്ട് ചെയ്യാം.'
    : 'Ration card corrections, address changes, or related issues can be reported under the "Administrative / Others" category.';
}
if (['disability support', 'disabled help', 'wheelchair support', 'ഭിന്നശേഷി സഹായം', 'വ്യത്യസ്ത ശേഷി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഭിന്നശേഷിക്കാർക്കുള്ള സഹായങ്ങൾ, ഉപകരണങ്ങൾ, സൗകര്യങ്ങൾ എന്നിവ "Health" അല്ലെങ്കിൽ "Administrative / Others" കാറ്റഗറിയിൽ അപേക്ഷിക്കാം.'
    : 'Support for differently-abled individuals, including accessibility or equipment requests, can be submitted under "Health" or "Administrative / Others".';
}
if (['unemployment assistance', 'jobless support', 'job scheme', 'തൊഴിലില്ലായ്മ', 'ജോലി സഹായം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'തൊഴിലില്ലായ്മ സഹായം അല്ലെങ്കിൽ തൊഴിൽ പദ്ധതികൾ സംബന്ധിച്ച വിവരങ്ങൾ "Administrative / Others" കാറ്റഗറിയിൽ ചോദിക്കാം.'
    : 'Information regarding unemployment assistance or job schemes can be requested under the "Administrative / Others" category.';
}
if (['recommendation letter', 'mla recommendation', 'reference letter', 'ശുപാർശ കത്ത്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'MLA ശുപാർശ കത്ത് ആവശ്യപ്പെട്ടാൽ ആവശ്യകത വിശദീകരിച്ച് "Administrative / Others" കാറ്റഗറിയിൽ അപേക്ഷിക്കാം.'
    : 'You may request an MLA recommendation letter under "Administrative / Others" by clearly explaining the purpose.';
}
if (['agriculture subsidy', 'farmer scheme', 'farming support', 'കാർഷിക സബ്സിഡി', 'കർഷക സഹായം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'കാർഷിക സബ്സിഡി, കർഷക സഹായ പദ്ധതികൾ സംബന്ധിച്ച അപേക്ഷകൾ "Agriculture" കാറ്റഗറിയിൽ സമർപ്പിക്കാം.'
    : 'Applications related to agricultural subsidies or farmer welfare schemes can be submitted under the "Agriculture" category.';
}
if (['emergency financial support', 'poor family help', 'financial crisis', 'സാമ്പത്തിക സഹായം', 'അടിയന്തിര സഹായം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'അടിയന്തിര സാമ്പത്തിക സഹായം ആവശ്യപ്പെട്ട് "Administrative / Others" കാറ്റഗറിയിൽ അപേക്ഷിക്കാം.'
    : 'Emergency financial support requests can be submitted under the "Administrative / Others" category.';
}
if (['scheme application status', 'welfare status', 'application tracking', 'അപേക്ഷ നില', 'സ്കീം സ്റ്റാറ്റസ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ക്ഷേമപദ്ധതി അപേക്ഷയുടെ നില അറിയാൻ ബന്ധപ്പെട്ട Tracking ID ഉപയോഗിക്കുക അല്ലെങ്കിൽ MLA ഓഫീസുമായി ബന്ധപ്പെടുക.'
    : 'Use your Tracking ID or contact the MLA office to check the status of your welfare scheme application.';
}
if (['laptop scheme', 'study aid', 'student laptop', 'ലാപ്ടോപ്പ് പദ്ധതി', 'പഠന സഹായം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'വിദ്യാർത്ഥികൾക്കുള്ള ലാപ്ടോപ്പ് അല്ലെങ്കിൽ പഠന സഹായ പദ്ധതികൾ സംബന്ധിച്ച വിവരങ്ങൾ "Education" കാറ്റഗറിയിൽ ലഭ്യമാണ്.'
    : 'Information about student laptop or study assistance schemes can be requested under the "Education" category.';
}
if (['house repair', 'home maintenance aid', 'repair assistance', 'വീട് അറ്റകുറ്റപ്പണി', 'വീട് സഹായം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'വീട് അറ്റകുറ്റപ്പണി സഹായ പദ്ധതികൾക്കായി "Housing" അല്ലെങ്കിൽ "Administrative / Others" കാറ്റഗറിയിൽ അപേക്ഷിക്കാം.'
    : 'House repair assistance requests can be submitted under the "Housing" or "Administrative / Others" category.';
}
if (['senior citizen support', 'elderly assistance', 'old age help', 'മുതിർന്ന പൗരൻ', 'വൃദ്ധ സഹായം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'മുതിർന്ന പൗരന്മാർക്കുള്ള പ്രത്യേക സഹായങ്ങൾ "Administrative / Others" അല്ലെങ്കിൽ "Health" കാറ്റഗറിയിൽ അപേക്ഷിക്കാം.'
    : 'Special assistance requests for senior citizens can be submitted under "Administrative / Others" or "Health".';
}
if (['disability pension', 'pension for disabled', 'ഭിന്നശേഷി പെൻഷൻ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഭിന്നശേഷി പെൻഷൻ സംബന്ധിച്ച സഹായങ്ങൾ "Health" അല്ലെങ്കിൽ "Administrative / Others" കാറ്റഗറിയിൽ ലഭ്യമാണ്.'
    : 'Support related to disability pension can be requested under the "Health" or "Administrative / Others" category.';
}
if (['small business support', 'self employment', 'startup help', 'സ്വയംതൊഴിൽ', 'ചെറുകിട ബിസിനസ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'സ്വയംതൊഴിൽ അല്ലെങ്കിൽ ചെറുകിട ബിസിനസ് സഹായ പദ്ധതികൾ സംബന്ധിച്ച വിവരങ്ങൾ "Administrative / Others" കാറ്റഗറിയിൽ ചോദിക്കാം.'
    : 'Information regarding self-employment or small business support schemes can be requested under the "Administrative / Others" category.';
}
if (['welfare payment delay', 'scheme payment pending', 'payment issue', 'പദ്ധതി തുക വൈകുന്നു', 'പേയ്മെന്റ് പ്രശ്നം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ക്ഷേമപദ്ധതി തുക വൈകുന്നതുമായി ബന്ധപ്പെട്ട പ്രശ്നങ്ങൾ "Administrative / Others" കാറ്റഗറിയിൽ റിപ്പോർട്ട് ചെയ്യുക.'
    : 'Delays in welfare scheme payments can be reported under the "Administrative / Others" category.';
}
if (['water connection', 'drinking water connection', 'new water supply', 'കുടിവെള്ള കണക്ഷൻ', 'വെള്ള കണക്ഷൻ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'കുടിവെള്ള കണക്ഷൻ സംബന്ധിച്ച സഹായങ്ങൾ "KWA / Water Supply" കാറ്റഗറിയിൽ അപേക്ഷിക്കാം.'
    : 'Requests related to drinking water connections can be submitted under the "KWA / Water Supply" category.';
}
if (['new government schemes', 'latest schemes', 'government benefits', 'പുതിയ സർക്കാർ പദ്ധതി', 'സർക്കാർ ആനുകൂല്യം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'പുതിയ സർക്കാർ പദ്ധതികളും ആനുകൂല്യങ്ങളും സംബന്ധിച്ച വിവരങ്ങൾ MLA ഓഫീസ് വഴി ലഭ്യമാണ്.'
    : 'Information about new government schemes and benefits is available through the MLA office.';
}
if (['education loan', 'student loan help', 'loan assistance', 'വിദ്യാഭ്യാസ വായ്പ', 'വിദ്യാർത്ഥി വായ്പ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'വിദ്യാഭ്യാസ വായ്പ സഹായവുമായി ബന്ധപ്പെട്ട വിവരങ്ങൾ "Education" കാറ്റഗറിയിൽ ചോദിക്കാം.'
    : 'Information regarding educational loan assistance can be requested under the "Education" category.';
}
if (['character certificate', 'caste certificate', 'income certificate', 'certificate request', 'ക്യാരക്ടർ സർട്ടിഫിക്കറ്റ്', 'ജാതി സർട്ടിഫിക്കറ്റ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'സർട്ടിഫിക്കറ്റുകൾ സാധാരണയായി Village Office / Taluk Office വഴിയാണ് ലഭിക്കുക. MLA ശുപാർശ ആവശ്യമായാൽ "Administrative / Others" കാറ്റഗറിയിൽ അപേക്ഷിക്കാം.'
    : 'Certificates such as caste, income, or character certificates are usually issued through the Village or Taluk Office. If MLA recommendation is required, you may submit a request under "Administrative / Others".';
}
    if (['free', 'cost', 'charge', 'fee', 'സൗജന്യം'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'അതെ! EnteMLA കേരളത്തിലെ എല്ലാ പൗരന്മാർക്കും തികച്ചും സൗജന്യമാണ്.': 'EnteMLA is completely free for all citizens of Kerala.';
    }
    if (['who can use', 'eligible', 'who can file', 'ആർക്ക് ഉപയോഗിക്കാം', 'ആർക്ക് പരാതി'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'കേരളത്തിലെ ഏത് പൗരനും EnteMLA ഉപയോഗിക്കാം. ഒരു സ്മാർട്ട്ഫോണും ഇന്റർനെറ്റ് കണക്ഷനും ഉണ്ടെങ്കിൽ മതിയാകും.'
        : 'Any citizen of Kerala can use EnteMLA. All you need is a smartphone and an internet connection.';
    }
    if (['mobile app', 'android', 'ios', 'app download', 'play store', 'മൊബൈൽ ആപ്പ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'EnteMLA ഇപ്പോൾ വെബ് പോർട്ടലായി ലഭ്യമാണ്. മൊബൈൽ ആപ്പ് ഉടൻ വരുന്നതാണ്. Chrome ബ്രൗസർ ഉപയോഗിച്ച് മൊബൈലിൽ ആക്സസ് ചെയ്യാം.'
        : 'EnteMLA is currently available as a web portal. A dedicated mobile app is coming soon. You can access it via Chrome browser on your mobile device.';
    }
    if (['outside kerala', 'other state', 'not in kerala', 'കേരളത്തിന് പുറത്ത്', 'മറ്റ് സംസ്ഥാനം'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'EnteMLA കേരളത്തിലെ പൗരന്മാർക്ക് മാത്രമായി രൂപകൽപ്പന ചെയ്തിട്ടുള്ളതാണ്. മറ്റ് സംസ്ഥാനങ്ങൾക്ക് ഇത് ബാധകമല്ല.'
        : 'EnteMLA is exclusively designed for citizens of Kerala. It is not applicable for complaints from other states.';
    }
    if (['language support', 'which language', 'chatbot language', 'ഏത് ഭാഷ', 'ഭാഷ പിന്തുണ'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'EnteMLA ചാറ്റ്ബോട്ട് ഇംഗ്ലീഷും മലയാളവും പൂർണ്ണമായി പിന്തുണയ്ക്കുന്നു. Manglish (ഇംഗ്ലീഷ് അക്ഷരത്തിൽ മലയാളം) ഉപയോഗിച്ചും ചോദ്യങ്ങൾ ചോദിക്കാം.'
        : 'The EnteMLA chatbot fully supports both English and Malayalam. You can also type in Manglish (Malayalam written in English letters).';
    }
    if (['malayalam supported', 'english and malayalam', 'ഭാഷ', 'മലയാളം'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'അതെ! ഈ പോർട്ടൽ ഇംഗ്ലീഷും മലയാളവും പൂർണ്ണമായി പിന്തുണയ്ക്കുന്നു. നിങ്ങൾക്ക് മംഗ്ലീഷിൽ (Manglish) ടൈപ്പ് ചെയ്താൽ പോലും സിസ്റ്റം അത് മനസ്സിലാക്കി മറുപടി നൽകും.'
        : 'Yes! The application core fully respects bi-lingual query matrices. You can write commands using formal script, English, or mixed Manglish phonetics natively.';
    }
    if (['complaint in malayalam', 'complaints in malayalam', 'write in malayalam', 'മലയാളത്തിൽ പരാതി'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'അതെ! നിങ്ങൾക്ക് മലയാളത്തിലോ ഇംഗ്ലീഷിലോ പരാതി സമർപ്പിക്കാം.': 'Yes! You can submit your complaint in either Malayalam or English.';
    }
    if (['create account', 'create an account', 'register a account','register an account','signup', 'അക്കൗണ്ട്'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'അക്കൗണ്ട് നിർമ്മിക്കാൻ:\n1. "Sign Up" അല്ലെങ്കിൽ "Register" ബട്ടൺ ക്ലിക്ക് ചെയ്യുക.\n2. പേര്, മൊബൈൽ നമ്പർ, വിലാസം എന്നിവ നൽകുക.\n3. മൊബൈലിൽ വരുന്ന OTP വെരിഫൈ ചെയ്ത് രജിസ്ട്രേഷൻ പൂർത്തിയാക്കുക.'
        : 'To create an account:\n1. Tap "Register/Sign Up" on the welcome page.\n2. Enter your name, mobile number, and address.\n3. Verify the OTP sent to your mobile to complete registration.';
    }
    if (['mobile number already exists', 'നിലവിലുണ്ട്'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'മറ്റൊരു നമ്പർ ഉപയോഗിച്ച് വീണ്ടും ശ്രമിക്കുക.': 'This mobile number is already registered. Please use a different number and try again.';
    }
    if (['otp required', 'without registration', 'otp വേണോ', 'രജിസ്റ്റർ ചെയ്യാതെ'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'അതെ, വ്യാജ അക്കൗണ്ടുകൾ തടയുന്നതിനായി OTP വെരിഫിക്കേഷൻ നിർബന്ധമാണ്. രജിസ്റ്റർ ചെയ്യാതെ നിങ്ങൾക്ക് വെബ്‌സൈറ്റ് ബ്രൗസ് ചെയ്യാം, എന്നാൽ പരാതി സമർപ്പിക്കാൻ രജിസ്ട്രേഷൻ വേണം.'
        : 'Yes, OTP verification is mandatory to prevent fake accounts. You can browse the website without registering, but submitting a complaint requires registration.';
    }
    if (['otp not','otp is not','receive an otp','receive a otp','otp varunnilla', 'ഒടിപി', 'otp വരുന്നില്ല'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'മൊബൈൽ നെറ്റ്‌വർക്ക് പരിധിയിൽ ആണെന്ന് ഉറപ്പാക്കുക. 2 മിനിറ്റ് കാത്തിരുന്ന ശേഷം "Resend OTP" ബട്ടൺ ക്ലിക്ക് ചെയ്യുക. പ്രശ്നം തുടരുകയാണെങ്കിൽ നിങ്ങളുടെ SMS ഇൻബോക്സ് ഫുൾ ആണോ എന്ന് നോക്കുക.'
        : 'Make sure your mobile has network coverage. Wait 2 minutes then tap "Resend OTP". If the problem continues, check if your SMS inbox is full.';
    }
    if (['login fail', 'cannot login', 'ലോഗിൻ ചെയ്യാൻ'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'തെറ്റായ മൊബൈൽ നമ്പറോ പാസ്‌വേഡോ നൽകുന്നത് കൊണ്ടാകാം ഇത്. ഇന്റർനെറ്റ് കണക്ഷൻ ഉറപ്പാക്കുക. പ്രശ്നം തുടരുകയാണെങ്കിൽ പാസ്‌വേഡ് റീസെറ്റ് ചെയ്യുക.'
        : 'This may be due to an incorrect mobile number or password. Check your internet connection. If the problem persists, reset your password using "Forgot Password".';
    }
    if (['login', 'log in', 'sign in', 'ലോഗിൻ'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'ലോഗിൻ നിർബന്ധമാണ്. ലോഗിൻ ചെയ്യാൻ ഫോൺ നമ്പറും പാസ്‌വേഡും നൽകുക.\n\nപാസ്‌വേഡ് മറന്നോ? "Forgot Password" ക്ലിക്ക് ചെയ്ത് ഫോൺ നമ്പർ നൽകുക.'
        : 'Login is required. Enter your phone number and password to log in.\n\nForgot password? Click "Forgot Password" and enter your phone number.';
    }
    if (['password', 'reset', 'forgot', 'പാസ്‌വേഡ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'പാസ്‌വേഡ് മറന്നുപോയെങ്കിൽ, ലോഗിൻ പേജിലെ "Forgot Password" ലിങ്കിൽ ക്ലിക്ക് ചെയ്ത് രജിസ്റ്റർ ചെയ്ത മൊബൈൽ നമ്പറിലേക്ക് വരുന്ന OTP വഴി പുതിയ പാസ്‌വേഡ് സെറ്റ് ചെയ്യാം.'
        : 'If you forgot your password, click "Forgot Password" on the login page and enter your registered mobile number. You will receive an OTP to set a new password.';
    }
    if (['change mobile', 'change phone', 'മൊബൈൽ നമ്പർ മാറ്റാൻ', 'ഫോൺ നമ്പർ മാറ്റാൻ'].some(w => q.includes(w))) {
      return lang === 'Malayalam'? 'സുരക്ഷാ കാരണങ്ങളാൽ രജിസ്റ്റർ ചെയ്ത മൊബൈൽ നമ്പർ സ്വയം മാറ്റാൻ കഴിയില്ല. ഇതിനായി EnteMLA ഹെൽപ്ഡെസ്കുമായി നേരിട്ട് ബന്ധപ്പെടണം.'
        : 'For security reasons, you cannot change your registered mobile number on your own. Please contact the EnteMLA helpdesk directly to update it.';
    }
  if (['what if resolved but problem exists','complaint status says','resolved but','fake resolved', 'wrongly resolved', 'problem still there', 'പ്രശ്നം ഇപ്പോഴും', 'resolved ആയെങ്കിലും'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'പ്രശ്നം പൂർണ്ണമായി പരിഹരിക്കപ്പെട്ടിട്ടില്ലെങ്കിലും "Resolved" ആയെങ്കിൽ, പഴയ Tracking ID പരാമർശിച്ച് "Problem Not Fixed" എന്ന് Description-ൽ വ്യക്തമായി എഴുതി പുതിയ പരാതി ഫയൽ ചെയ്യുക. ഫോട്ടോ ചേർക്കുക.'
    : 'If your complaint shows "Resolved" but the problem still exists, file a new complaint referencing the old Tracking ID. Clearly write "Problem Not Fixed" in the description and attach current photos as evidence.';
  }
    if (['update profile', 'edit profile', 'വിവരങ്ങൾ മാറ്റാൻ'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'ലോഗിൻ ചെയ്ത ശേഷം "Profile Settings" സെക്ഷൻ വഴി വിലാസവും മറ്റ് വിവരങ്ങളും മാറ്റാം. എന്നാൽ സുരക്ഷ മുൻനിർത്തി മൊബൈൽ നമ്പർ മാറ്റാൻ ഹെൽപ്പ്ഡെസ്കുമായി ബന്ധപ്പെടണം.'
        : 'After logging in, go to "Profile Settings" to update your address and other details. To change your mobile number, contact the helpdesk for security reasons.';
    }
    if (['register a complaint','complain ', 'register a new grievance','പരാതി രജിസ്റ്റർ'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'വിശദാംശങ്ങൾ നൽകി കാറ്റഗറി തിരഞ്ഞെടുക്കുന്നതിലൂടെ പരാതി പോർട്ടൽ വഴി നിങ്ങൾക്ക് പരാതി സമർപ്പിക്കാം!'
        : 'You can submit/register a complaint through the Complaint Portal by providing details and selecting the appropriate category.';
    }
    if ((['detail', 'details are mandatory','information', 'require', 'what do i need', 'document', 'mandatory', 'വിവരങ്ങൾ', 'എന്തൊക്കെ വേണം'].some(w => q.includes(w))) &&
      (['need to submit', 'grievance', 'issue', 'പരാതി'].some(w => q.includes(w)))){return lang === 'Malayalam'
        ? 'പരാതി സമർപ്പിക്കാൻ താഴെ പറയുന്ന വിവരങ്ങൾ ആവശ്യമാണ്:\n• പരാതിയുടെ വിഷയം (Category/Type)\n• കൃത്യമായ സ്ഥലം/വിലാസം\n• പ്രശ്നത്തിന്റെ വിവരണം (Description)\n• സപ്പോർട്ടിങ് ഫോട്ടോകൾ അല്ലെങ്കിൽ രേഖകൾ (ഉണ്ടെങ്കിൽ മാത്രം)'
        : 'To submit a complaint, you will need:\n• Complaint Category (e.g., Roads, Water)\n• Location of the issue\n• Detailed description of the problem\n• Supporting photos or documents (Optional)';
    }
    if (['which category', 'what category', 'choose category', 'select category', 'ഏത് കാറ്റഗറി', 'കാറ്റഗറി തിരഞ്ഞെടുക്കാൻ'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'നിങ്ങളുടെ പ്രശ്നത്തിന് ഏറ്റവും അടുത്ത കാറ്റഗറി തിരഞ്ഞെടുക്കുക:\n• റോഡ് / ഗതാഗതം → PWD\n• കുടിവെള്ളം → KWA\n• വൈദ്യുതി → KSEB\n• ആരോഗ്യം, ഭവനം, വിദ്യാഭ്യാസം\n• മറ്റുള്ളവ → Administrative / Others\n\nശരിയായ കാറ്റഗറി തിരഞ്ഞെടുത്താൽ പ്രശ്നം വേഗത്തിൽ പരിഹരിക്കാൻ സഹായിക്കും.'
        : 'Choose the category that best matches your issue:\n• Road / Transport → PWD\n• Drinking Water → KWA\n• Electricity → KSEB\n• Health, Housing, Education\n• Others → Administrative / Others\n\nSelecting the correct category helps resolve your complaint faster.';
    }
    if (['types of complaint','type of complaints', 'kind of complaint', 'what complaint', 'which complaint', 'വിഭാഗം'].some(w => q.includes(w))) {return lang === 'Malayalam'? 'ഈ വിഷയങ്ങളിൽ പരാതി നൽകാം:\n• റോഡ്, ഗതാഗതം\n• ജലവിതരണം\n• വൈദ്യുതി\n• പൊതുജനാരോഗ്യം\n• ഭവനം\n• വിദ്യാഭ്യാസം\n• മറ്റ് പൗര പ്രശ്നങ്ങൾ'
        : 'You can file complaints about:\n• Roads and transport\n• Water supply\n• Electricity\n• Public health\n• Housing\n• Education\n• Other civic issues';
    }
    if (['road', 'water', 'electricity', 'waste', 'kseb', 'kwa', 'pwd', 'റോഡ്', 'വെള്ളം', 'കരണ്ട്', 'മാലിന്യം'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'അതെ! റോഡ് തകർച്ച, കുടിവെള്ള മുടക്കം, തെരുവ് വിളക്കുകൾ, ട്രാൻസ്ഫോർമർ തകരാറുകൾ, പൊതുമാലിന്യ പ്രശ്നങ്ങൾ എന്നിവ ബന്ധപ്പെട്ട വകുപ്പ് കാറ്റഗറി തിരഞ്ഞെടുത്ത് ഇവിടെ ഫയൽ ചെയ്യാം.'
        : 'Yes! You can report road damage (PWD), water supply issues (KWA), electricity faults (KSEB), street lights, and public waste issues by selecting the relevant category.';
    }
    if (['corruption', 'misconduct', 'അഴിമതി'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'ഔദ്യോഗിക അഴിമതി അല്ലെങ്കിൽ ഉദ്യോഗസ്ഥരുടെ മോശം പെരുമാറ്റം എന്നിവയ്ക്കെതിരെ "Administrative / Others" കാറ്റഗറി തിരഞ്ഞെടുത്ത് കൃത്യമായ തെളിവുകളോടെ പരാതി സമർപ്പിക്കാം.'
        : 'Complaints regarding official corruption or misconduct can be filed under the "Administrative / Others" category. Provide supporting documents for faster processing.';
    }
    if (['village', 'ward', 'panchayat', 'gram', 'പഞ്ചായത്ത്', 'വാർഡ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'അതെ! ഗ്രാമ പഞ്ചായത്ത്, നഗരസഭ, മുനിസിപ്പാലിറ്റി തല പ്രശ്നങ്ങളും MLA-യ്ക്ക് ബോധ്യപ്പെടുത്തി പരിഹരിക്കാൻ EnteMLA ഉപയോഗിക്കാം.'
        : 'Yes! Issues at gram panchayat, municipality, or ward level can also be reported through EnteMLA to bring them to the MLA\'s attention.';
    }
    if (['anonymous', 'anonymously', 'without name', 'പേര് പറയാതെ', 'പേര് വെക്കാതെ', 'രഹസ്യമായി', 'അജ്ഞാത', 'can i file anonymously'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'ഇല്ല, അജ്ഞാതമായി (Anonymous) പരാതി നൽകാൻ സാധിക്കില്ല. വ്യാജ പരാതികൾ ഒഴിവാക്കാനും ഉദ്യോഗസ്ഥർക്ക് നിങ്ങളുമായി ബന്ധപ്പെടാനും ഫോൺ നമ്പർ വെരിഫിക്കേഷൻ നിർബന്ധമാണ്.'
        : 'No, anonymous complaints are not supported. Phone number verification is mandatory to prevent fake complaints and allow departments to contact you if needed.';
    }
    if (['behalf', 'someone else', 'another person', 'മറ്റൊരാൾക്ക് വേണ്ടി', 'വേറൊരാൾക്ക്'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'അതെ! നിങ്ങൾക്ക് മറ്റൊരാൾക്ക് വേണ്ടി പരാതി സമർപ്പിക്കാൻ സാധിക്കും. പക്ഷേ ബന്ധപ്പെട്ട വ്യക്തിയുടെ കൃത്യമായ വിവരങ്ങൾ ഉൾപ്പെടുത്തണം.'
        : 'Yes! You can file a complaint on behalf of someone else. Make sure to include the correct details of the affected person.';
    }
    if (['phone call', 'call to complain', 'submit by call', 'ഫോൺ വഴി പരാതി', 'വിളിച്ചു പരാതി'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'ഇല്ല, നിലവിൽ ഫോൺ കോൾ വഴി പരാതി സ്വീകരിക്കുന്നില്ല. EnteMLA പോർട്ടലിലൂടെ മാത്രമേ ഓൺലൈൻ പരാതി സമർപ്പിക്കാൻ സാധിക്കൂ.'
        : 'No, complaints cannot be submitted via phone call at this time. Please use the EnteMLA web portal to file your complaint online.';
    }
    if (['whatsapp', 'whatsapp number', 'വാട്സ്ആപ്പ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'നിലവിൽ EnteMLA-ക്ക് ഔദ്യോഗിക WhatsApp നമ്പർ ഇല്ല. പരാതികൾ പോർട്ടൽ വഴി മാത്രം സമർപ്പിക്കാം. കൂടുതൽ സഹായത്തിന് "Contact Us" പേജ് സന്ദർശിക്കുക.'
        : 'EnteMLA does not have an official WhatsApp number. Complaints can only be submitted through the portal. Visit the "Contact Us" page for more support options.';
    }
    if (['how many complaint', 'limit', 'maximum complaint', 'എത്ര പരാതി'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'ഒരു യൂസർക്ക് ഒന്നിലധികം പരാതികൾ നൽകാം. ഓരോ പരാതിക്കും പ്രത്യേക ട്രാക്കിംഗ് ID ലഭിക്കുന്നതാണ്.'
        : 'There is no limit on the number of complaints you can file. Each complaint gets a unique tracking ID.';
    }
    if (['multiple complaints', 'more than one', 'another complaint', 'രണ്ടാമത്തെ', 'ഒന്നിലധികം', 'കൂടുതൽ പരാതി'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'അതെ! നിങ്ങൾക്ക് ഒന്നിലധികം പരാതികൾ സമർപ്പിക്കാം. ഓരോ പരാതിക്കും പ്രത്യേക ട്രാക്കിംഗ് ID ലഭിക്കുന്നതായിരിക്കും.'
        : 'Yes! You can submit multiple complaints. Each complaint will be assigned a unique tracking ID so you can track them individually.';
    }
    if (['wrong constituency', 'wrong area', 'different area', 'തെറ്റായ മണ്ഡലം'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'നിങ്ങൾ തെറ്റായ മണ്ഡലത്തിൽ പരാതി നൽകിയാൽ അത് നിരസിക്കപ്പെടാം. ശരിയായ MLA-യുടെ കീഴിൽ ഉൾപ്പെടുന്ന മണ്ഡലത്തിൽ മാത്രം പരാതി നൽകുക.'
        : 'If you file a complaint in the wrong constituency, it may be rejected. Make sure to file under the correct MLA and constituency that covers your area.';
    }
    if (['upload photos', 'upload documents', 'include photos', 'include documents', 'attach'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'അതെ! പരാതി സമർപ്പിക്കുന്നതിനോടൊപ്പം നിങ്ങൾക്ക് ഫോട്ടോകളും രേഖകളും അപ്‌ലോഡ് ചെയ്യാൻ സാധിക്കും. ഇത് പ്രശ്നം വേഗത്തിൽ പരിഹരിക്കാൻ സഹായിക്കും.'
        : 'Yes! You can upload photos and documents along with your complaint. This helps us understand your issue more clearly and resolve it faster.';
    }
    if (['proof', 'evidence', 'without photo', 'no document', 'തെളിവ്', 'ഫോട്ടോ ഇല്ലെങ്കിൽ'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'ഫോട്ടോ അല്ലെങ്കിൽ രേഖകൾ ഓപ്ഷണൽ ആണ്. തെളിവുകൾ ഇല്ലെങ്കിലും പരാതി സ്വീകരിക്കുന്നതാണ്. എന്നാൽ ഫോട്ടോ ഉണ്ടെങ്കിൽ പ്രശ്നം വേഗത്തിൽ പരിഹരിക്കാൻ സഹായിക്കും.'
        : 'Photos and documents are optional. Complaints are accepted without them. However, attaching photos helps resolve the issue faster.';
    }
    if (['file formats', 'format', 'pdf', 'jpg', 'png'].some(w => q.includes(w))) {return lang === 'Malayalam'? '📄 Documents: PDF\n📷 Images: JPG, JPEG, PNG (പരമാവധി 5MB)': '📄 Documents: PDF\n📷 Images: JPG, JPEG, PNG (Max 5MB)';} 
    if (['what happens', 'after submit', 'after filing', 'entha sambhavika', 'ശേഷം'].some(w => q.includes(w)) &&['complaint', 'submit', 'parathi', 'പരാതി'].some(w => q.includes(w))) {
      return lang === 'Malayalam'? 'പരാതി സമർപ്പിച്ചതിന് ശേഷം:\n1. നിങ്ങൾക്ക് ഒരു തനത് Tracking ID ലഭിക്കും.\n2. MLA ഓഫീസ് നിങ്ങളുടെ പരാതി പരിശോധിച്ച് ബന്ധപ്പെട്ട വകുപ്പിലേക്ക് കൈമാറും.\n3. പരാതിയുടെ പുരോഗതി ഡാഷ്ബോർഡിലൂടെ ട്രാക്ക് ചെയ്യാം.'
        : 'After submitting a complaint:\n1. You will receive a unique Tracking ID.\n2. The MLA office will verify it and forward it to the concerned department.\n3. You can track the progress in real-time using your dashboard.';
    }
    if (['what is my tracking id', 'find tracking id', 'where is tracking id', 'tracking id എവിടെ', 'ട്രാക്കിംഗ് ഐഡി'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'പരാതി സമർപ്പിച്ചതിന് ശേഷം Tracking ID സ്ക്രീനിൽ കാണിക്കുന്നതാണ്. "My Complaints" ഡാഷ്ബോർഡിൽ ലോഗിൻ ചെയ്ത് എല്ലാ പരാതികളുടെയും ID കാണാം.'
        : 'Your Tracking ID is displayed on screen immediately after submitting a complaint. You can also find it by logging into your dashboard under the "My Complaints" section.';
    }
    if (['check status','updates','complaint was submitted successfully','പരാതി വിജയകരമായി','track', 'status engane', 'complaint status', 'handling my complaint'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'നിങ്ങളുടെ പരാതി ട്രാക്ക് ചെയ്യാൻ:\n1. "Track Complaint" ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക.\n2. Tracking ID നൽകുക.\n3. നിലവിലെ അവസ്ഥ (Pending, In Progress, Resolved) കാണാം.'
        : 'To check your complaint status:\n1. Go to the "Track Complaint" section.\n2. Enter your Tracking ID.\n3. The current status (Pending, In Progress, Resolved) will be shown.';
    }
    if (['complaint number is not working', 'പരാതി നമ്പർ പ്രവർത്തിക്കുന്നില്ല'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'പരാതി നമ്പർ ശരിയായി നൽകിയിട്ടുണ്ടോ എന്ന് പരിശോധിക്കുക. പ്രശ്നം തുടരുകയാണെങ്കിൽ കുറച്ച് സമയം കഴിഞ്ഞ് വീണ്ടും ശ്രമിക്കുകയോ ഹെൽപ്ഡെസ്കുമായി ബന്ധപ്പെടുകയോ ചെയ്യുക.'
        : 'Please verify your complaint number and try again. If the problem continues, contact support or try again after a few minutes.';
    }
    if (['mla directly', 'mla see', 'mla kanumo', 'നേരിട്ട്'].some(w => q.includes(w)) &&['complaint', 'see', 'view', 'parathi', 'പരാതി'].some(w => q.includes(w))) {
      return lang === 'Malayalam'? 'നിങ്ങളുടെ പരാതികൾ ആദ്യം MLA-യുടെ പ്രത്യേക കോർഡിനേഷൻ ടീം പരിശോധിക്കുന്നു. അവർ ഇത് ബന്ധപ്പെട്ട ഉദ്യോഗസ്ഥർക്ക് കൈമാറുകയും, പ്രധാനപ്പെട്ട വിഷയങ്ങൾ MLA-യുടെ നേരിട്ടുള്ള ശ്രദ്ധയിൽ കൊണ്ടുവരികയും ചെയ്യും.'
        : 'Complaints are first reviewed by the MLA\'s dedicated coordination team. They forward issues to the relevant department, while critical matters are flagged for the MLA\'s direct attention.';
    }
    if (['department', 'vakuppu', 'who handles', 'ഏത് വകുപ്പ്'].some(w => q.includes(w)) &&['complaint', 'handle', 'route', 'parathi', 'പരാതി'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'നിങ്ങൾ പരാതി നൽകുമ്പോൾ തിരഞ്ഞെടുക്കുന്ന കാറ്റഗറി അനുസരിച്ചാണ് വകുപ്പ് നിശ്ചയിക്കുന്നത്. ഉദാ: റോഡ് → PWD, കുടിവെള്ളം → KWA.': 'The department is determined by the category you select. For example: road issues → PWD, drinking water → KWA.';
    }
    if (['sms', 'email', 'notification', 'മെസ്സേജ്', 'അറിയിപ്പ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'അതെ! പരാതി രജിസ്റ്റർ ചെയ്യുമ്പോഴും പരിഹരിക്കപ്പെടുമ്പോഴും രജിസ്റ്റർ ചെയ്ത നമ്പറിലേക്ക് ഓട്ടോമാറ്റിക് SMS അറിയിപ്പുകൾ ലഭിക്കുന്നതാണ്.'
        : 'Yes! You will receive automatic SMS notifications on your registered mobile number when your complaint is submitted and when its status changes.';
    }
    if (q.includes('pending') || q.includes('പെൻഡിങ്')) {return lang === 'Malayalam'
        ? '"Pending" എന്നാൽ നിങ്ങളുടെ പരാതി സിസ്റ്റത്തിൽ ലഭിച്ചു എന്നും, MLA ഓഫീസ് അത് പരിശോധിക്കാൻ കാത്തിരിക്കുകയാണ് എന്നും അർത്ഥമാക്കുന്നു.'
        : '"Pending" means your complaint has been successfully received and is waiting to be reviewed by the MLA office team.';
    }
    if (q.includes('in progress') || q.includes('പ്രോഗ്രസ്')) {return lang === 'Malayalam'
        ? '"In Progress" എന്നാൽ നിങ്ങളുടെ പരാതി ഓഫീസ് പരിശോധിക്കുകയും ബന്ധപ്പെട്ട സർക്കാർ വകുപ്പിലേക്ക് (PWD, KWA, KSEB) കൈമാറി നടപടികൾ ആരംഭിച്ചു എന്നും അർത്ഥമാക്കുന്നു.'
        : '"In Progress" means your complaint has been verified by the MLA office and forwarded to the relevant government department for resolution.';
    }
    if (q.includes('resolved') || q.includes('തീർപ്പായ')) {return lang === 'Malayalam'
        ? '"Resolved" എന്നാൽ ബന്ധപ്പെട്ട വകുപ്പ് ആവശ്യമായ നടപടികൾ സ്വീകരിച്ച് പ്രശ്നം പൂർണ്ണമായി പരിഹരിച്ചു എന്ന് രേഖപ്പെടുത്തിയിരിക്കുന്നു.'
        : '"Resolved" means the concerned department has completed the necessary action and officially closed your complaint.';
    }
    if (['status', 'track', 'സ്റ്റാറ്റസ്', 'സ്ഥിതി'].some(w => q.includes(w)) && ['grievance', 'issue', 'പരാതി'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'പരാതിയുടെ ഗൗരവവും വകുപ്പിന്റെ ജോലിഭാരവും അനുസരിച്ച് മിക്ക പരാതികളും 48 മണിക്കൂറിൽ നിന്ന് 7 പ്രവൃത്തി ദിവസത്തിനുള്ളിൽ പരിഹരിക്കപ്പെടും.'
        : 'Most complaints are resolved within 48 hours to 7 working days depending on the severity and department workload.';
    }
    if (['know if', 'epol pariharikum', 'എങ്ങനെ അറിയാം'].some(w => q.includes(w)) &&['complaint', 'status', 'parathi', 'പരാതി'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'പരാതി പൂർണ്ണമായി പരിഹരിക്കപ്പെടുമ്പോൾ ഡാഷ്ബോർഡിലെ സ്റ്റാറ്റസ് "Resolved" ആകും. കൂടാതെ രജിസ്റ്റർ ചെയ്ത നമ്പറിലേക്ക് SMS ലഭിക്കുകയും ചെയ്യും.'
        : 'When your complaint is resolved, the status on your dashboard will change to "Resolved" and you will receive an SMS on your registered mobile number.';
    } 
    if (['edit', 'modify', 'മാറ്റാൻ', 'തിരുത്താൻ'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'ഇല്ല, സമർപ്പിച്ചതിന് ശേഷം പരാതി തിരുത്താൻ (Edit) കഴിയില്ല. മാറ്റം വേണ്ടെങ്കിൽ നിലവിലെ പരാതി പിൻവലിച്ച് പുതിയൊരു പരാതി സമർപ്പിക്കാം.'
        : 'No, you cannot edit a complaint once submitted. If you need changes, withdraw the current complaint and submit a new one with the correct information.';
    }
    const matchesDeleteKeywords = ['delete', 'remove', 'cancel', 'withdraw', 'ഒഴിവാക്കാൻ', 'പിൻവലിക്കാൻ', 'ഡിലീറ്റ്'].some(w => q.includes(w));
    const isRelatedToComplaint = q.includes('complaint') || q.includes('issue') || q.includes('parathi') || q.includes('പരാതി');
    if (matchesDeleteKeywords && isRelatedToComplaint) {return lang === 'Malayalam'
        ? 'അതെ, പരാതി "Pending" സ്റ്റാറ്റസിൽ ആണെങ്കിൽ പിൻവലിക്കാം. MLA ഓഫീസ് "In Progress" ആക്കിയ ശേഷം ഡിലീറ്റ് ചെയ്യാൻ സാധിക്കില്ല.'
        : 'Yes, you can withdraw a complaint as long as its status is "Pending". Once it moves to "In Progress", it cannot be deleted.';
    }
    if (['twice', 'two times', 'by mistake', 'മാറിപ്പോയി'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'അബദ്ധത്തിൽ ഒരേ പരാതി രണ്ടുതവണ പോയാൽ "My Complaints" സെക്ഷനിൽ പോയി ഒന്ന് പിൻവലിക്കുക.'
        : 'If you accidentally submitted the same complaint twice, go to "My Complaints" and withdraw the duplicate entry.';
    }
    if (['reopen', 'വീണ്ടും തുറക്കാൻ', 'not satisfied'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'നിലവിൽ Resolved പരാതികൾ Reopen ചെയ്യാൻ കഴിയില്ല. പ്രശ്നം പരിഹരിച്ചിട്ടില്ലെങ്കിൽ, പഴയ Tracking ID പരാമർശിച്ചുകൊണ്ട് പുതിയ പരാതി ഫയൽ ചെയ്യാം.'
        : 'Resolved complaints cannot be reopened directly. If the issue is not fully fixed, please file a new complaint and reference your previous Tracking ID in the description.';
    }
    if (['rejected', 'നിഷേധിച്ചു', 'തള്ളി'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'അപൂർണ്ണമായ വിവരങ്ങൾ, തെറ്റായ വിലാസം, അല്ലെങ്കിൽ മണ്ഡലത്തിന് പുറത്തുള്ള പ്രദേശം കാരണം പരാതി നിരസിക്കപ്പെടാം. കൃത്യമായ കാരണം Tracking Status-ൽ കാണിച്ചിട്ടുണ്ടാകും.'
        : 'Complaints may be rejected due to incomplete information, wrong location, or the issue being outside the constituency. The exact reason will be shown in your tracking status.';
    }
    if (['history', 'മുൻപ് നൽകിയ', 'ചരിത്രം'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'ലോഗിൻ ചെയ്ത ശേഷം "My Complaints" അല്ലെങ്കിൽ "Dashboard" സെക്ഷനിൽ ഇതുവരെ നൽകിയ എല്ലാ പരാതികളുടെയും ചരിത്രം കാണാം.'
        : 'After logging in, visit the "My Complaints" or "Dashboard" section to view the full history of all your submitted complaints.';
    }
    if (['feedback', 'rating', 'satisfied', 'review', 'അഭിപ്രായം', 'സംതൃപ്തി'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'പരാതി പരിഹരിച്ചതിന് ശേഷം ഡാഷ്ബോർഡിൽ ഫീഡ്ബാക്ക് നൽകാൻ ഓപ്ഷൻ ലഭ്യമാണ്.'
        : 'After your complaint is resolved, you can provide feedback and rate the resolution from your dashboard.';
    }
    if (['how long', 'how much time', 'when will', 'എത്ര ദിവസം', 'എപ്പോൾ പരിഹരിക്കും'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'പ്രശ്നത്തിന്റെ ഗൗരവം അനുസരിച്ച് 48 മണിക്കൂർ മുതൽ 7 പ്രവൃത്തി ദിവസം വരെ സമയമെടുക്കാം.'
        : 'Depending on the severity of the issue, resolution can take anywhere from 48 hours to 7 working days.';
    }
    if (['resolve', 'solve', 'പരാതി പരിഹരിക്കാൻ എത്ര സമയമെടുക്കും'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'പരാതിയുടെ ഗൗരവവും വകുപ്പിന്റെ ജോലിഭാരവും അനുസരിച്ച് മിക്ക പരാതികളും 48 മണിക്കൂറിനുള്ളിൽ പരിഹരിക്കും.'
        : 'Most complaints are addressed within 48 hours depending on severity and department workload.';
    }
    if (['delay', 'വൈകുന്നു', 'no updates', 'വിവരം ഒന്നുമില്ല'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'ചില പരാതികൾക്ക് ഫണ്ട് അനുമതി അല്ലെങ്കിൽ ഇന്റർ-ഡിപ്പാർട്ട്മെന്റ് അനുമതി ആവശ്യമാകാം. Tracking ID ഉപയോഗിച്ച് സ്റ്റാറ്റസ് ചെക്ക് ചെയ്യുക അല്ലെങ്കിൽ MLA ഹെൽപ്ഡെസ്കുമായി ബന്ധപ്പെടുക.'
        : 'Delays can occur if the issue requires inter-department approvals or budget sanctions. Check your dashboard for status updates or contact the MLA helpdesk.';
    }
    if (['escalate', 'no response', 'not resolved', 'ignored', 'പ്രതികരണം'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'പ്രതികരണം ഇല്ലെങ്കിൽ:\n• MLA ഓഫീസിൽ നേരിട്ട് ബന്ധപ്പെടുക\n• തിങ്കൾ-ശനി, 10AM-5PM ഓഫീസ് സന്ദർശിക്കുക\n• ജനസമ്പർക്ക പരിപാടിയിൽ പങ്കെടുക്കുക'
        : 'If you receive no response:\n• Contact the MLA office directly\n• Visit office Monday–Saturday, 10AM–5PM\n• Attend the public outreach program (ജനസമ്പർക്ക പരിപാടി)';
    }
    if (['mla term', 'mla changed', 'new mla', 'election', 'mla term ends', 'mla കാലാവധി', 'പുതിയ mla'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'MLA-യുടെ കാലാവധി അവസാനിക്കുകയോ പുതിയ MLA അധികാരമേൽക്കുകയോ ചെയ്‌താൽ Pending/In Progress പരാതികൾ ഓഫീസ് ടീം തുടർ നടപടി ഉറപ്പ് വരുത്തുന്നതാണ്.'
        : 'If the MLA\'s term ends or a new MLA takes charge, the office team ensures that existing Pending or In Progress complaints continue to be followed up and resolved.';
    }
    // ── Master District Data ──────────────────────────────────────────────────────

const DISTRICTS: Record<string, { en: string[]; ml: string[]; keywords: string[] }> = {
  kasaragod:          { en: ['Manjeshwaram','Kasaragod','Udma','Kanhangad','Thrikaripur'], ml: ['മഞ്ചേശ്വരം','കാസർഗോഡ്','ഉദുമ','കാഞ്ഞങ്ങാട്','തൃക്കരിപ്പൂർ'], keywords: ['kasaragod','കാസർഗോഡ്'] },
  kannur:             { en: ['Payyanur','Kalliasseri','Taliparamba','Irikkur','Azhikode','Kannur','Dharmadom','Thalassery','Kuthuparamba','Mattanur','Peravoor'], ml: ['പയ്യന്നൂർ','കല്ല്യാശ്ശേരി','തലിപ്പറമ്പ','ഇരിക്കൂർ','അഴീക്കോട്','കണ്ണൂർ','ധർമ്മടം','തലശ്ശേരി','കൂത്തുപറമ്പ','മട്ടന്നൂർ','പേരാവൂർ'], keywords: ['kannur','cannanore','കണ്ണൂർ'] },
  wayanad:            { en: ['Mananthavady','Sulthan Bathery','Kalpetta'], ml: ['മാനന്തവാടി','സുൽത്താൻ ബത്തേരി','കൽപ്പറ്റ'], keywords: ['wayanad','വയനാട്'] },
  kozhikode:          { en: ['Vatakara','Kuttiady','Nadapuram','Koyilandy','Perambra','Balussery','Elathur','Kozhikode North','Kozhikode South','Beypore','Kunnamangalam','Koduvally','Thiruvambady'], ml: ['വടകര','കുറ്റ്യാടി','നടാപ്പുറം','കൊയിലാണ്ടി','പേരമ്പ്ര','ബാലുശ്ശേരി','ഏലത്തൂർ','കോഴിക്കോട് നോർത്ത്','കോഴിക്കോട് സൗത്ത്','ബേപ്പൂർ','കുന്നമംഗലം','കോടുവള്ളി','തിരുവമ്പാടി'], keywords: ['kozhikode','calicut','കോഴിക്കോട്'] },
  malappuram:         { en: ['Kondotty','Eranad','Nilambur','Wandoor','Manjeri','Perinthalmanna','Mankada','Malappuram','Vengara','Vallikkunnu','Tirurangadi','Tanur','Tirur','Kottakkal','Thavanur','Ponnani'], ml: ['കൊണ്ടോട്ടി','എറനാട്','നിലമ്പൂർ','വണ്ടൂർ','മഞ്ചേരി','പെരിന്തൽമണ്ണ','മങ്കട','മലപ്പുറം','വേങ്ങര','വളളിക്കുന്നു','തിരൂരങ്ങാടി','തനൂർ','തിരൂർ','കൊട്ടക്കൽ','താവനൂർ','പൊന്നാനി'], keywords: ['malappuram','മലപ്പുറം'] },
  palakkad:           { en: ['Thrithala','Pattambi','Shornur','Ottapalam','Kongad','Mannarkkad','Malampuzha','Palakkad','Tarur','Chittur','Nenmara','Alathur'], ml: ['തൃത്താല','പട്ടാമ്പി','ഷൊർണൂർ','ഒറ്റപ്പാലം','കൊങ്ങാട്','മണ്ണാർക്കാട്','മലമ്പുഴ','പാലക്കാട്','തരൂർ','ചിറ്റൂർ','നെന്മാറ','അലത്തൂർ'], keywords: ['palakkad','palghat','പാലക്കാട്'] },
  thrissur:           { en: ['Chelakkara','Kunnamkulam','Guruvayur','Manalur','Wadakkanchery','Ollur','Thrissur','Nattika','Kaipamangalam','Irinjalakuda','Puthukkad','Chalakudy','Kodungallur'], ml: ['ചേലക്കര','കുന്നംകുളം','ഗുരുവായൂർ','മണലൂർ','വടക്കാഞ്ചേരി','ഒല്ലൂർ','തൃശൂർ','നാട്ടിക','കൈപ്പമംഗലം','ഇരിഞ്ഞാലക്കുട','പുതുക്കാട്','ചാലക്കുടി','കൊടുങ്ങല്ലൂർ'], keywords: ['thrissur','trichur','തൃശൂർ'] },
  ernakulam:          { en: ['Perumbavoor','Angamaly','Aluva','Kalamassery','Paravur','Vypin','Kochi','Thrippunithura','Ernakulam','Thrikkakara','Kunnathunad'], ml: ['പെരുമ്പാവൂർ','അങ്കമാലി','ആലുവ','കളമശ്ശേരി','പാറവൂർ','വൈപ്പിൻ','കൊച്ചി','തൃപ്പൂണിത്തുറ','എറണാകുളം','തൃക്കാക്കര','കുന്നതുനാട്'], keywords: ['ernakulam','kochi','cochin','എറണാകുളം'] },
  idukki:             { en: ['Devikulam','Udumbanchola','Thodupuzha','Idukki','Peerumade','Piravom','Muvattupuzha','Kothamangalam'], ml: ['ദേവികുളം','ഉടുമ്പൻചോല','തൊടുപുഴ','ഇടുക്കി','പീരുമേട്','പിറവം','മൂവാറ്റുപുഴ','കോതമംഗലം'], keywords: ['idukki','ഇടുക്കി'] },
  kottayam:           { en: ['Pala','Kaduthuruthy','Vaikom','Ettumanoor','Kottayam','Puthuppally','Changanassery','Kanjirappally','Poonjar'], ml: ['പാല','കടുത്തുരുത്തി','വൈക്കം','എട്ടുമാനൂർ','കോട്ടയം','പുത്തുപ്പള്ളി','ചങ്ങനാശ്ശേരി','കാഞ്ഞിരപ്പള്ളി','പൂഞ്ഞാർ'], keywords: ['kottayam','കോട്ടയം'] },
  alappuzha:          { en: ['Aroor','Cherthala','Alappuzha','Ambalappuzha','Kuttanad','Haripad','Kayamkulam','Mavelikara','Chengannur'], ml: ['അരൂർ','ചേർത്തല','ആലപ്പുഴ','അമ്പലപ്പുഴ','കുട്ടനാട്','ഹരിപ്പാട്','കായംകുളം','മാവേലിക്കര','ചെങ്ങന്നൂർ'], keywords: ['alappuzha','alleppey','ആലപ്പുഴ'] },
  pathanamthitta:     { en: ['Thiruvalla','Ranni','Aranmula','Konni','Adoor'], ml: ['തിരുവല്ല','റാന്നി','ആറന്മുള','കൊന്നി','ആടൂർ'], keywords: ['pathanamthitta','പത്തനംതിട്ട'] },
  kollam:             { en: ['Karunagapally','Chavara','Kunnathur','Kottarakkara','Pathanapuram','Punalur','Chadayamangalam','Kundara','Kollam','Eravipuram','Chathannoor'], ml: ['കരുനാഗപ്പള്ളി','ചവറ','കുന്നത്തൂർ','കൊട്ടാരക്കര','പതനാപ്പുരം','പുനലൂർ','ചടയമംഗലം','കുണ്ടറ','കൊല്ലം','എരവിപുരം','ചതന്നൂർ'], keywords: ['kollam','quilon','കൊല്ലം'] },
  thiruvananthapuram: { en: ['Varkala','Attingal','Chirayinkeezhu','Nedumangad','Vamanapuram','Kazhakkoottam','Vattiyoorkavu','Thiruvananthapuram','Nemom','Aruvikkara','Parassala','Kattakkada','Kovalam','Neyyattinkara'], ml: ['വർക്കല','അറ്റിങ്ങൽ','ചിറയിൻകീഴ്','നെടുമങ്ങാട്','വാമനപുരം','കഴക്കൂട്ടം','വട്ടിയൂർക്കാവ്','തിരുവനന്തപുരം','നേമം','അരുവിക്കര','പാറശ്ശാല','കട്ടക്കട','കോവളം','നെയ്യാറ്റിൻകര'], keywords: ['thiruvananthapuram','trivandrum','തിരുവനന്തപുരം'] },
};

function findDistrict(q: string): string | null {
  for (const [district, data] of Object.entries(DISTRICTS)) {
    if (data.keywords.some(k => q.includes(k))) return district;
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// ALL if-else if BLOCKS — ORDER MATTERS: specific → broad
// ─────────────────────────────────────────────────────────────────────────────

if (['who is my mla', 'contact mla', 'mla number', 'ഫോൺ നമ്പർ'].some(w => q.includes(w))) {
  return lang === 'Malayalam'
    ? 'ദയവായി നിങ്ങളുടെ മണ്ഡലത്തിന്റെ പേര് പറയാമോ?'
    : 'Could you please share your constituency name?';

} else if (['how many mla', 'total mla', 'kerala mla', 'എത്ര mla', 'mla എത്ര'].some(w => q.includes(w))) {
  return lang === 'Malayalam'
    ? 'കേരള നിയമസഭയിൽ ആകെ 140 MLA-കൾ ഉണ്ട്. ഓരോ നിയമസഭാ മണ്ഡലത്തിലും ഒരു MLA ഉണ്ടായിരിക്കും.'
    : 'Kerala Legislative Assembly has a total of 140 MLAs, one representing each Assembly Constituency.';

} else if (['how many district', 'total district', 'districts in kerala', 'എത്ര ജില്ല', 'ജില്ലകൾ'].some(w => q.includes(w))) {
  return lang === 'Malayalam'
    ? 'കേരളത്തിൽ ആകെ 14 ജില്ലകളാണുള്ളത്.'
    : 'There are a total of 14 administrative districts in Kerala.';

} else if (['how many constituencies', 'how many seats', 'how many assembly', 'how many mandalam',
            'എത്ര മണ്ഡലം', 'എത്ര സീറ്റ്', 'എത്ര നിയമസഭ'].some(w => q.includes(w))) {
  const district = findDistrict(q);
  if (district) {
    const data = DISTRICTS[district];
    const name = district.charAt(0).toUpperCase() + district.slice(1);
    return lang === 'Malayalam'
      ? `${name} ജില്ലയിൽ ${data.ml.length} നിയമസഭാ മണ്ഡലങ്ങൾ ഉണ്ട്:\n${data.ml.join(', ')}`
      : `${name} district has ${data.en.length} assembly constituencies:\n${data.en.join(', ')}`;
  }
  // No district found — general count
  return lang === 'Malayalam'
    ? 'കേരളത്തിൽ ആകെ 140 നിയമസഭാ മണ്ഡലങ്ങൾ ഉണ്ട്.'
    : 'Kerala has a total of 140 assembly constituencies.';

} else if (['constituencies in', 'seats in', 'assembly in', 'mandalam in',
            'മണ്ഡലങ്ങൾ', 'സീറ്റുകൾ'].some(w => q.includes(w))) {
  const district = findDistrict(q);
  if (district) {
    const data = DISTRICTS[district];
    const name = district.charAt(0).toUpperCase() + district.slice(1);
    return lang === 'Malayalam'
      ? `${name} ജില്ലയിലെ നിയമസഭാ മണ്ഡലങ്ങൾ (${data.ml.length}):\n${data.ml.join(', ')}`
      : `Assembly constituencies in ${name} district (${data.en.length}):\n${data.en.join(', ')}`;
  }

} else if (['all constituencies', 'list of constituencies', 'kerala constituencies', 'all assembly',
            'list constituency', 'all constituency',
            'എല്ലാ മണ്ഡലങ്ങൾ', 'മണ്ഡലങ്ങളുടെ പട്ടിക', 'കേരള മണ്ഡലം'].some(w => q.includes(w))) {
  return lang === 'Malayalam'
    ? `കേരളത്തിൽ ആകെ 140 നിയമസഭാ മണ്ഡലങ്ങൾ ഉണ്ട്:\n\n` +
      Object.entries(DISTRICTS).map(([d, v]) =>
        `${d.charAt(0).toUpperCase() + d.slice(1)}: ${v.ml.join(', ')}`).join('\n')
    : `Kerala has 140 Assembly constituencies across 14 districts:\n\n` +
      Object.entries(DISTRICTS).map(([d, v]) =>
        `${d.charAt(0).toUpperCase() + d.slice(1)} (${v.en.length}): ${v.en.join(', ')}`).join('\n');

} else if (['my constituency', 'which constituency', 'find constituency', 'ഏത് മണ്ഡലം', 'എന്റെ മണ്ഡലം'].some(w => q.includes(w))) {
  return lang === 'Malayalam'
    ? 'നിങ്ങളുടെ മണ്ഡലം കണ്ടെത്താൻ വോട്ടർ ID കാർഡ് നോക്കുക അല്ലെങ്കിൽ Kerala Election Commission വെബ്സൈറ്റ് സന്ദർശിക്കുക.'
    : 'To find your constituency, check your Voter ID card or visit the Kerala Election Commission website.';

} else if (['which department', 'what complaints', 'ഏത് വകുപ്പ്', 'എന്ത് പരാതി'].some(w => q.includes(w))) {
  return lang === 'Malayalam'
    ? 'നിങ്ങളുടെ പരാതിക്ക് അനുയോജ്യമായ വകുപ്പ് (PWD, KWA, KSEB) ലിസ്റ്റിൽ നിന്ന് കാറ്റഗറി തിരഞ്ഞെടുക്കുക.'
    : 'Select the appropriate department category (PWD, KWA, KSEB, etc.) from the dropdown list when submitting your complaint.';

} else if (['office hour', 'office time', 'timing', 'ഓഫീസ് സമയം', 'എപ്പോൾ'].some(w => q.includes(w))) {
  return lang === 'Malayalam'
    ? 'ഓഫീസ് സമയം: തിങ്കൾ മുതൽ ശനി വരെ, രാവിലെ 10:00 മുതൽ വൈകിട്ട് 5:00 വരെ.'
    : 'Office hours: Monday to Saturday, 10:00 AM to 5:00 PM.';

} else if (['safe', 'privacy', 'secure', 'public', 'personal data', 'സുരക്ഷിതം', 'രഹസ്യം', 'സ്വകാര്യത'].some(w => q.includes(w))) {
  return lang === 'Malayalam'
    ? 'നിങ്ങളുടെ വിവരങ്ങൾ സുരക്ഷിതമാണ്. ഫോൺ നമ്പറോ വിലാസമോ പൊതുജനങ്ങൾക്ക് കാണാൻ കഴിയില്ല. MLA ഓഫീസിനും ബന്ധപ്പെട്ട ഉദ്യോഗസ്ഥർക്കും മാത്രമേ ഇത് പരിശോധിക്കാൻ അനുമതിയുള്ളൂ.'
    : 'Your data is safe. Your phone number and address are not visible to the public. Only the MLA office and concerned officials have access to your personal details.';

} else if (['urgent', 'emergency', 'helpline', 'അടിയന്തിരം', 'ഹെൽപ്ലൈൻ'].some(w => q.includes(w))) {
  return lang === 'Malayalam'
    ? 'ശ്രദ്ധിക്കുക: EnteMLA അടിയന്തിര സഹായ പോർട്ടൽ അല്ല. അപകടങ്ങൾക്കും മെഡിക്കൽ എമർജൻസിക്കും ഔദ്യോഗിക ഹെൽപ്‌ലൈൻ 112 അല്ലെങ്കിൽ 101 ൽ ബന്ധപ്പെടുക.'
    : 'Note: EnteMLA is not an emergency portal. For accidents or medical emergencies, please contact the official helpline at 112 or 101 immediately.';

} else if (['helpdesk', 'support', 'contact entemla', 'help desk', 'contact support', 'contact helpdesk', 'ഹെൽപ്ഡെസ്ക്', 'സഹായം'].some(w => q.includes(w))) {
  return lang === 'Malayalam'
    ? 'സഹായത്തിന് "Contact Us" പേജ് സന്ദർശിക്കുക അല്ലെങ്കിൽ MLA ഓഫീസ് നേരിട്ട് ബന്ധപ്പെടുക.\nഓഫീസ് സമയം: തിങ്കൾ – ശനി, 10:00 AM – 5:00 PM.'
    : 'For support, visit the "Contact Us" page or contact the MLA office directly.\nOffice hours: Monday – Saturday, 10:00 AM – 5:00 PM.';

} else if (['not loading', 'slow', 'browser', 'ലോഡ് ആകുന്നില്ല', 'സ്ലോ'].some(w => q.includes(w))) {
  return lang === 'Malayalam'
    ? 'ബ്രൗസർ Cache ക്ലിയർ ചെയ്യുക അല്ലെങ്കിൽ Chrome, Firefox-ന്റെ പുതിയ പതിപ്പ് ഉപയോഗിക്കുക. പ്രശ്നം തുടരുകയാണെങ്കിൽ സെർവർ അപ്ഡേറ്റ് കൊണ്ടാകാം, അൽപ്പ സമയം കഴിഞ്ഞ് ശ്രമിക്കുക.'
    : 'Clear your browser cache or try using an updated version of Chrome or Firefox. If the issue continues, it may be due to a server update — please try again after a few minutes.';

} else if (['upload fail', 'file fail', 'അപ്‌ലോഡ്'].some(w => q.includes(w))) {
  return lang === 'Malayalam'
    ? 'ഫയൽ അപ്‌ലോഡ് പരാജയപ്പെട്ടാൽ ഫയൽ 5MB-യിൽ താഴെ ആണെന്നും PDF, JPG, PNG ഫോർമാറ്റ് ആണെന്നും ഉറപ്പാക്കുക.'
    : 'If upload fails, make sure your file is below 5MB and is in PDF, JPG, or PNG format.';

} else if (['track', 'status', 'tracking', 'ട്രാക്ക്', 'സ്ഥിതി'].some(w => q.includes(w))) {
  return lang === 'Malayalam'
    ? 'Tracking ID ഉപയോഗിച്ച് പരാതിയുടെ സ്ഥിതി അറിയാം.\n\n• Pending — പരിശോധന തുടങ്ങിയിട്ടില്ല\n• In Progress — പരിശോധിക്കുന്നു\n• Resolved — നടപടി എടുത്തു'
    : 'Use the Tracking ID to check complaint status.\n\n• Pending — Awaiting review\n• In Progress — Being reviewed\n• Resolved — Action taken';

} else if (q.includes('file a complaint') || q.includes('submit a complaint') || q.includes('register a complaint')
        || q.includes('new') || q.includes('raise') || q.includes('grievance') || q.includes('പരാതി നൽകാൻ')) {
  return lang === 'Malayalam'
    ? 'പരാതി നൽകാൻ:\n• EnteMLA-ൽ ലോഗിൻ ചെയ്യുക\n• "New Grievance" ക്ലിക്ക് ചെയ്യുക\n• വിവരങ്ങൾ നൽകുക\n• Submit ക്ലിക്ക് ചെയ്യുക\n\nTraking ID ലഭിക്കും.'
    : 'To file a complaint:\n• Login to EnteMLA\n• Click "New Grievance"\n• Fill in the details\n• Click Submit\n\nYou will receive a Tracking ID.';

} else {
  // ── MLA fuzzy lookup (fallback) ───────────────────────────────────────────
  const noiseWords = new Set(['who','what','is','the','of','are','tell','me','give','mla',
                               'constituency','about','phone','number','contact','in','for','a']);
  const words = q.split(/\s+/).filter(w => w.length > 2 && !noiseWords.has(w));
  const matched = this.mlas.find(m => {
    const content = m.content.toLowerCase();
    const source  = m.source.toLowerCase();
    return words.some(word => content.includes(word) || source.includes(word));
  });
  if (matched) {
    return lang === 'Malayalam' ? `വിവരം:\n${matched.content}` : matched.content;
  }
}
    if(['trust','useful','സുരക്ഷിത','ഉപയോഗ'].some(w => q.includes(w))) {return lang === 'Malayalam'
      ? 'EnteMLA സുരക്ഷിതവും ഉപയോഗപ്രദവുമായ പോർട്ടൽ ആണ്. നിങ്ങളുടെ ഫോണിൽ നിന്ന് തന്നെ, എപ്പോൾ വേണമെങ്കിലും, സൗജന്യമായി MLA-യ്ക്ക് നേരിട്ട് പരാതി നൽകാം.'
      : 'EnteMLA is a safe and useful portal. You can register complaints about civic issues directly to your MLA — anytime, for free, from your phone.'
    }
    if (['unable to upload files','cannot upload file','upload issue','upload problem','file upload error','അപ്‌ലോഡ്','ഫയൽ അപ്‌ലോഡ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഫയൽ അപ്‌ലോഡ് ചെയ്യാൻ കഴിയുന്നില്ലെങ്കിൽ, ഫയൽ 5MB-ൽ താഴെയാണെന്നും PDF, JPG, PNG ഫോർമാറ്റുകളിലൊന്നാണെന്നും ഉറപ്പാക്കുക.'
    : 'If you are unable to upload files, make sure the file is below 5MB and is in PDF, JPG, or PNG format.';
    }
    if (['what is mla', 'who is mla', 'mla meaning', 'mla എന്നാൽ', 'mla ആരാണ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'MLA എന്നാൽ Member of Legislative Assembly. ജനങ്ങൾ നേരിട്ട് തിരഞ്ഞെടുക്കുന്ന നിയമസഭാ അംഗം ആണ്. ഓരോ MLA-യും ഒരു നിയമസഭാ മണ്ഡലത്തെ പ്രതിനിധീകരിക്കുന്നു.'
    : 'MLA stands for Member of Legislative Assembly. They are directly elected representatives who represent a specific Assembly Constituency and work on local civic issues.';
    }
    if (['difference', 'mp and mla', 'mla vs mp', 'mla mp വ്യത്യാസം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'MLA സംസ്ഥാന നിയമസഭയിലും MP (Member of Parliament) കേന്ദ്ര പാർലമെന്റിലും പ്രതിനിധീകരിക്കുന്നു. റോഡ്, വെള്ളം, ആരോഗ്യം തുടങ്ങിയ പ്രാദേശിക പ്രശ്നങ്ങൾക്ക് MLA-യെ സമീപിക്കണം.'
    : 'An MLA represents you in the State Legislative Assembly, while an MP represents you in the Central Parliament. For local civic issues like roads, water, and health — contact your MLA.';
    }
    if (['what is grievance', 'grievance meaning', 'grievance എന്നാൽ', 'grievance definition'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'Grievance എന്നാൽ ഒരു പൗരൻ ഗവൺമെന്റ് സേവനങ്ങളെക്കുറിച്ചോ പ്രാദേശിക പ്രശ്നങ്ങളെക്കുറിച്ചോ നൽകുന്ന ഔദ്യോഗിക പരാതി ആണ്.'
    : 'A grievance is an official complaint submitted by a citizen regarding a government service failure or a local civic problem that requires official attention.';
    }
    if (['char', 'character limit', 'word limit', 'description limit','characters are allowed','എത്ര വാക്ക്', 'description length'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'പരാതിയുടെ വിവരണം (Description) പരമാവധി 500 അക്ഷരങ്ങൾ വരെ നൽകാം. കൃത്യവും വ്യക്തവുമായ ഒരു വിവരണം പ്രശ്നം വേഗം പരിഹരിക്കാൻ സഹായിക്കും.'
    : 'The complaint description can be up to 500 characters. A clear and concise description helps resolve the issue faster.';
    }
  if (['tips', 'good complaint', 'write a complaint', 'how to write', 'better complaint', 'effective', 'നല്ല പരാതി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഫലപ്രദമായ പരാതിക്ക്:\n• കൃത്യമായ സ്ഥലവും വിലാസവും നൽകുക\n• ഫോട്ടോ അറ്റാച്ച് ചെയ്യുക\n• "പ്രശ്നം എന്ത്, എവിടെ, എന്നുമുതൽ" എന്ന് ക്ലിയർ ആയി എഴുതുക\n• ശരിയായ കാറ്റഗറി തിരഞ്ഞെടുക്കുക'
    : 'For an effective complaint:\n• Mention exact location and address\n• Attach a photo if possible\n• Clearly state what the problem is, where it is, and since when\n• Select the correct category';
  }
  if (['fake complaint', 'false complaint', 'misuse', 'abuse', 'വ്യാജ പരാതി', 'ദുരുപയോഗം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'വ്യാജ അല്ലെങ്കിൽ തെറ്റായ പരാതികൾ OTP വെരിഫിക്കേഷൻ ഉള്ളതിനാൽ ദുഷ്കരമാണ്. ദുർഉദ്ദേശ്യത്തോടെ സമർപ്പിക്കുന്ന പരാതി നടപടി ക്ഷണിക്കുന്നതിന് കാരണമാകും.'
    : 'False or fake complaints are difficult due to OTP verification. Filing complaints with malicious intent may lead to action against the user.';
  }
  if (['difference between', 'portal vs', 'entemla vs', 'other portal', 'jagratha', 'sevasindhu', 'grievance portal'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA നിങ്ങളുടെ MLA-യ്ക്ക് നേരിട്ട് പ്രദേശിക പ്രശ്നങ്ങൾ അറിയിക്കാനുള്ള ഒരു പ്രത്യേക പോർട്ടൽ ആണ്. ഇത് MLA ഓഫീസ്, പൗരൻ, ഉദ്യോഗസ്ഥർ — ഈ മൂന്ന് കേന്ദ്രങ്ങളെ ഒരു സ്ഥലത്ത് ബന്ധിപ്പിക്കുന്നു.'
    : 'EnteMLA is a dedicated portal specifically to connect citizens with their elected MLA. It bridges citizens, MLA office, and departments in one platform for faster local issue resolution.';
  }
  if (['forgot tracking', 'lost tracking id', 'tracking id mararnju', 'tracking id കിട്ടുന്നില്ല'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ട്രാക്കിംഗ് ID നഷ്ടപ്പെട്ടാൽ "My Complaints" ഡാഷ്ബോർഡിൽ ലോഗിൻ ചെയ്ത് ഇതുവരെ സമർപ്പിച്ച എല്ലാ പരാതികളും കണ്ടെത്താം. SMS-ലും ID ഉണ്ടാകും.'
    : 'If you lost your Tracking ID, log into your dashboard and check the "My Complaints" section — all your submitted complaints are listed there. The ID is also sent via SMS.';
  }
  if (['internet', 'offline', 'without internet', 'ഇന്റർനെറ്റ് ഇല്ലാതെ', 'offline parathi'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA ഒരു ഓൺലൈൻ പോർട്ടൽ ആണ്. പരാതി സമർപ്പിക്കാൻ ഇന്റർനെറ്റ് കണക്ഷൻ നിർബന്ധമാണ്. ഇന്റർനെറ്റ് ഇല്ലെങ്കിൽ MLA ഓഫീസ് നേരിട്ട് സന്ദർശിക്കാം.'
    : 'EnteMLA is an online portal and requires an active internet connection. If you do not have internet access, you may visit the MLA office directly during office hours.';
  }
  if (['different constituency', 'two area', 'two constituency', 'complain for another area', 'two mla'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഓരോ MLA-യ്ക്കും അവരുടെ മണ്ഡലത്തിലെ പരാതികൾ മാത്രമേ കൈകാര്യം ചെയ്യാൻ അധികാരമുള്ളൂ. രണ്ട് മണ്ഡലങ്ങളിൽ പ്രശ്നം ഉണ്ടെങ്കിൽ ഓരോ MLA-യ്ക്കും പ്രത്യേകം പരാതി നൽകുക.'
    : 'Each MLA handles complaints only within their own constituency. If you have issues in two different areas, file separate complaints to the respective MLAs.';
  }
  if (['no action', 'nothing happening', 'no progress', 'inert', 'department not responding', 'no change', 'നടപടിയില്ല'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'നടപടി ഒന്നും ഇല്ലെങ്കിൽ:\n• ട്രാക്കിംഗ് ഡാഷ്ബോർഡ് വഴി ഓർമ്മിപ്പിക്കൽ (Reminder) ഓപ്ഷൻ ഉപയോഗിക്കുക\n• MLA ഓഫീസുമായി ബന്ധപ്പെടുക\n• ജനസമ്പർക്ക പരിപാടിയിൽ പ്രശ്നം ഉന്നയിക്കുക'
    : 'If no action is taken:\n• Use the Reminder option from your tracking dashboard\n• Contact the MLA office directly\n• Raise the issue at the public outreach program (Janasamparkan)';
  }
  if (['reminder', 'follow up', 'ഓർമ്മിപ്പിക്കൽ', 'ഫോളോ അപ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? '"My Complaints" ഡാഷ്ബോർഡിൽ "Send Reminder" ഓപ്ഷൻ ഉപയോഗിച്ച് പ്രശ്നം ഓർമ്മിപ്പിക്കൽ MLA ഓഫീസിലേക്ക് അയക്കാം.'
    : 'You can send a follow-up reminder to the MLA office using the "Send Reminder" option available in your "My Complaints" dashboard.';
  }
  if (['voter id', 'aadhaar', 'id proof', 'document required to register', 'ആധാർ', 'വോട്ടർ ഐഡി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA-ൽ രജിസ്ട്രേഷൻ ചെയ്യാൻ Aadhaar അല്ലെങ്കിൽ Voter ID നിർബന്ധമില്ല. OTP-വഴി വെരിഫൈ ചെയ്യുന്ന ഒരു മൊബൈൽ നമ്പർ മതിയാകും.'
    : 'Aadhaar or Voter ID is not mandatory to register on EnteMLA. A valid mobile number verified via OTP is sufficient to create your account.';
  }
  if (['complaint visible to public', 'others can see', 'public complaint', 'public view', 'മറ്റുള്ളവർ കാണുമോ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'നിങ്ങളുടെ പരാതി പൊതുജനങ്ങൾക്ക് ദൃശ്യമല്ല. MLA ഓഫീസിനും ബന്ധപ്പെട്ട ഉദ്യോഗസ്ഥർക്കും മാത്രമേ ഇത് കാണൻ കഴിയൂ.'
    : 'Your complaint is not publicly visible. Only the MLA office and relevant officials can view the details of your complaint.';
  }
  if (['what if mla rejects', 'mla dismiss', 'mla nirakarikkum', 'mla ignore my complaint', 'mla does not accept'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'MLA ഓഫീസ് പരാതി നിരസിക്കുകയാണെങ്കിൽ "Rejected" സ്റ്റാറ്റസും കാരണവും ഡാഷ്ബോർഡിൽ കാണിക്കും. കാരണം ശരിയാക്കി, ആവശ്യമെങ്കിൽ ഫോട്ടോ ചേർത്ത് വീണ്ടും പരാതി ഫയൽ ചെയ്യാം.'
    : 'If the MLA office rejects your complaint, the status will show "Rejected" with the reason on your dashboard. You can correct the issue and re-submit with supporting photos.';
  }
  if (['complaint limit per day', 'daily limit', 'per day', 'ഒരു ദിവസം', 'daily complaint'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഒരു ദിവസം ഒന്നിലധികം പരാതികൾ ഫയൽ ചെയ്യാൻ സാധിക്കും. ഓരോ പരാതിക്കും പ്രത്യേക ട്രാക്കിംഗ് ID ലഭിക്കും. ദുർഉദ്ദേശ്യ ഉപയോഗം ഒഴിവാക്കണം.'
    : 'You can file multiple complaints in a day — there is no daily limit. Each will get its own Tracking ID. Please avoid misuse of the portal.';
  }
  if (['what is tracking id', 'tracking id meaning', 'tracking id എന്തിനാണ്', 'tracking id ആവശ്യം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'Tracking ID ഒരു uniqueആയ reference number ആണ്. ഇത് ഉപയോഗിച്ച് നിങ്ങളുടെ പരാതിയുടെ നിലവിലെ സ്ഥിതി (Pending / In Progress / Resolved) ഏത് സമയത്തും ട്രാക്ക് ചെയ്യാം.'
    : 'A Tracking ID is a unique reference number assigned to each complaint. Use it to check your complaint\'s current status (Pending / In Progress / Resolved) at any time.';
  }
  if (['how to contact mla', 'meet mla', 'mla office visit', 'mla ഓഫീസ് സന്ദർശനം', 'mla-യെ കാണാൻ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'MLA-യ്ക്ക് നേരിട്ട് കാണണമെങ്കിൽ:\n• ഓഫീസ് സന്ദർശിക്കുക (തിങ്കൾ–ശനി, 10AM–5PM)\n• ജനസമ്പർക്ക പരിപാടിയിൽ (Janasamparkan) പങ്കെടുക്കുക\n• EnteMLA "Contact Us" പേജ് നോക്കുക'
    : 'To meet your MLA in person:\n• Visit the MLA office (Mon–Sat, 10AM–5PM)\n• Attend the Janasamparkan (public outreach) program\n• Check the "Contact Us" page on EnteMLA for schedule details';
  }
  if (['portal down', 'website down', 'server error', 'error page', 'site not working', 'പോർട്ടൽ പ്രവർത്തിക്കുന്നില്ല'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'പോർട്ടൽ പ്രവർത്തിക്കുന്നില്ലെങ്കിൽ, ഇന്റർനെറ്റ് കണക്ഷൻ ഉറപ്പാക്കി, 15–30 മിനിറ്റ് കഴിഞ്ഞ് ശ്രമിക്കുക. ബ്രൗസർ Cache ക്ലിയർ ചെയ്യുകയോ മറ്റൊരു ബ്രൗസർ ഉപയോഗിക്കുകയോ ചെയ്യുക. പ്രശ്നം തുടർന്നാൽ ഹെൽപ്ഡെസ്കുമായി ബന്ധപ്പെടുക.'
    : 'If the portal is not working, check your internet connection and try again after 15–30 minutes. Try clearing your browser cache or switching to a different browser. If the issue persists, contact the helpdesk.';
  }
  if (['can i suggest', 'feature request', 'improve portal', 'suggestion', 'feedback for portal', 'നിർദ്ദേശം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA-ക്ക് നിർദ്ദേശങ്ങൾ നൽകാൻ "Contact Us" പേജ് സന്ദർശിക്കുക. നിങ്ങളുടെ ഫീഡ്ബാക്ക് പോർട്ടൽ മെച്ചപ്പെടുത്താൻ സഹായിക്കും.'
    : 'To suggest improvements or new features for EnteMLA, visit the "Contact Us" page. Your feedback helps us make the portal better for everyone.';
  }
  if (['what is corestone', 'corestone innovations', 'corestone company', 'corestone എന്താണ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'Corestone Innovations ആണ് EnteMLA ഡിസൈൻ ചെയ്തും നിർമ്മിച്ചതും. അത്യാധുനിക സാങ്കേതിക വിദ്യ ഉപയോഗിച്ച് പൗരന്മാർക്കും ജനപ്രതിനിധികൾക്കും ഇടയിലുള്ള വിടവ് നികത്തുക എന്നതാണ് അവരുടെ ലക്ഷ്യം.'
    : 'Corestone Innovations is the company that designed and developed EnteMLA. Their mission is to bridge the gap between citizens and elected representatives using modern, reliable technology.';
  }
  if (['new user', 'first time', 'beginner', 'how to start', 'getting started', 'ആദ്യമായി', 'പുതിയ യൂസർ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA ആദ്യമായി ഉപയോഗിക്കുന്നവർക്ക്:\n1. Register ചെയ്ത് OTP വഴി അക്കൗണ്ട് ഉണ്ടാക്കുക\n2. ലോഗിൻ ചെയ്ത് "New Grievance" ക്ലിക്ക് ചെയ്യുക\n3. കാറ്റഗറി, വിലാസം, വിവരണം നൽകി Submit ചെയ്യുക\n4. Tracking ID സൂക്ഷിക്കുക'
    : 'Getting started with EnteMLA:\n1. Register and verify your account via OTP\n2. Login and click "New Grievance"\n3. Select category, enter location and description, then Submit\n4. Save your Tracking ID for future reference';
  }
  if (['street light', 'streetlight', 'lamp post', 'തെരുവ് വിളക്ക്', 'വിളക്ക് കത്തുന്നില്ല'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'തെരുവ് വിളക്ക് പ്രശ്നങ്ങൾ "Electricity / KSEB" കാറ്റഗറിയിൽ ഫയൽ ചെയ്യാം. കൃത്യമായ സ്ഥലം (പഞ്ചായത്ത്, വാർഡ്, റോഡ് പേര്) ഉൾപ്പെടുത്തുക.'
    : 'Street light issues can be filed under the "Electricity / KSEB" category. Include the exact location such as ward name, road name, and nearest landmark for faster resolution.';
  }
  if (['drainage', 'sewage', 'flood', 'waterlogging', 'drain block', 'മഴവെള്ളം', 'ഡ്രെയിൻ', 'വെള്ളക്കെട്ട്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഡ്രെയിനേജ്, വെള്ളക്കെട്ട്, അഴുക്കുചാൽ പ്രശ്നങ്ങൾ "PWD" അല്ലെങ്കിൽ "Administrative / Others" കാറ്റഗറിയിൽ ഫയൽ ചെയ്യാം.'
    : 'Drainage, sewage, or waterlogging issues can be filed under the "PWD" or "Administrative / Others" category. Attach photos to strengthen your complaint.';
  }
  if (['hospital', 'health center', 'medical', 'doctor', 'ambulance', 'ആശുപത്രി', 'ആരോഗ്യ കേന്ദ്രം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ആശുപത്രി, ആരോഗ്യ കേന്ദ്രം, ഡോക്ടർ ദൗർലഭ്യം തുടങ്ങിയ ആരോഗ്യ സംബന്ധിയായ പ്രശ്നങ്ങൾ "Health" കാറ്റഗറിയിൽ ഫയൽ ചെയ്യാം.'
    : 'Issues related to hospitals, health centers, or lack of medical staff can be filed under the "Health" category when submitting your complaint.';
  }
  if (['street dog','dog issue','stray dog','dog complaint','street dogs','തെരുവ് നായ','നായ പ്രശ്നം'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'അതെ. തെരുവ് നായ പ്രശ്നങ്ങൾ EnteMLA വഴി "Administrative / Others" കാറ്റഗറിയിൽ റിപ്പോർട്ട് ചെയ്യാം.'
        : 'Yes. You can report street dog issues through EnteMLA under the "Administrative / Others" category.';
  }
  if (['garbage dumping','waste issue','public garbage','trash complaint','dumping waste','garbage problem','മാലിന്യം','മാലിന്യ നിക്ഷേപം','ചവറ്റുകുട്ടി പ്രശ്നം'].some(w => q.includes(w))) {return lang === 'Malayalam'
        ? 'പൊതു സ്ഥലങ്ങളിലെ മാലിന്യ നിക്ഷേപ പ്രശ്നങ്ങൾ "Health", "Sanitation", അല്ലെങ്കിൽ "Administrative / Others" കാറ്റഗറിയിൽ റിപ്പോർട്ട് ചെയ്യാം.'
        : 'Garbage dumping in public places can be reported under the "Health", "Sanitation", or "Administrative / Others" category.';
  }
  if(['school', 'college', 'teacher', 'education', 'scholarship', 'സ്കൂൾ', 'കോളേജ്', 'അദ്ധ്യാപകൻ', 'വിദ്യാഭ്യാസം'].some(w => q.includes(w))){return lang === 'Malayalam'
    ? 'സ്കൂൾ, കോളേജ്, അദ്ധ്യാപക ദൗർലഭ്യം, സ്കോളർഷിപ്പ് പ്രശ്നങ്ങൾ "Education" കാറ്റഗറിയിൽ ഫയൽ ചെയ്യാം.': 'Issues related to schools, colleges, teacher shortages, or scholarship problems can be filed under the "Education" category.';}
  if (['housing', 'home', 'shelter', 'building permit', 'ഭവനം', 'വീട്', 'ഭവന പദ്ധതി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഭവന പദ്ധതി, ഭൂരഹിത ഭവന നിർമ്മാണ പ്രശ്നങ്ങൾ "Housing" കാറ്റഗറിയിൽ ഫയൽ ചെയ്യാം.': 'Housing scheme issues, homeless shelter problems, or building-related civic concerns can be filed under the "Housing" category.';
  }
  if (['ration', 'ration card', 'pds', 'food supply', 'ration shop', 'റേഷൻ', 'റേഷൻ കാർഡ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'റേഷൻ കാർഡ്, PDS (Public Distribution System) അല്ലെങ്കിൽ ഭക്ഷ്യ വിതരണ പ്രശ്നങ്ങൾ "Administrative / Others" കാറ്റഗറിയിൽ ഫയൽ ചെയ്യാം.'
    : 'Ration card, PDS, or food supply related issues can be filed under the "Administrative / Others" category on the portal.';
  }
  if (['pension', 'welfare', 'scheme', 'benefit', 'allowance', 'പെൻഷൻ', 'ക്ഷേമ പദ്ധതി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'പെൻഷൻ, ക്ഷേമ പദ്ധതി, സർക്കാർ ആനുകൂല്യ പ്രശ്നങ്ങൾ "Administrative / Others" കാറ്റഗറിയിൽ ഫയൽ ചെയ്യാം.'
    : 'Pension delays, welfare scheme issues, or government benefit problems can be reported under the "Administrative / Others" category.';
  }
  if (['tree', 'fallen tree', 'encroachment', 'land issue', 'public property', 'മരം', 'മരം വീണ്', 'കൈയേറ്റം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'വീണ മരങ്ങൾ, റോഡ് കൈയേറ്റം, പൊതു സ്വത്ത് പ്രശ്നങ്ങൾ "PWD" അല്ലെങ്കിൽ "Administrative / Others" കാറ്റഗറിയിൽ ഫയൽ ചെയ്യാം.'
    : 'Fallen trees, road encroachments, or public property issues can be reported under the "PWD" or "Administrative / Others" category.';
  }
  if (['noise', 'pollution', 'garbage', 'waste dump', 'smell', 'ശബ്ദ മലിനീകരണം', 'മാലിന്യം', 'ദുർഗന്ധം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ശബ്ദ മലിനീകരണം, ഖരമാലിന്യ നിക്ഷേപം, ദുർഗന്ധ പ്രശ്നങ്ങൾ "Administrative / Others" കാറ്റഗറിയിൽ ഫോട്ടോ തെളിവോടെ ഫയൽ ചെയ്യാം.': 'Noise pollution, illegal garbage dumping, or bad odor issues can be reported under "Administrative / Others". Attach photos as evidence for faster action.';
  }
  if (['bus', 'transport', 'ksrtc', 'auto', 'public transport', 'ബസ്', 'ഗതാഗതം', 'ksrtc'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'KSRTC ബസ് സർവ്വീസ്, ഗതാഗത പ്രശ്നങ്ങൾ "Road / Transport" കാറ്റഗറിയിൽ ഫയൽ ചെയ്യാം.'
    : 'KSRTC bus service issues or public transport complaints can be filed under the "Road / Transport" category.';
  }
  if (['bridge', 'culvert', 'overbridge', 'potholes', 'road damage', 'പാലം', 'കുഴി', 'റോഡ് തകർന്ന്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'പാലം തകർച്ച, കുഴികൾ, റോഡ് നാശം എന്നിവ "PWD / Road" കാറ്റഗറിയിൽ ഫോട്ടോ ഉൾപ്പെടുത്തി ഫയൽ ചെയ്യാം.': 'Bridge damage, potholes, or road deterioration can be filed under the "PWD / Road" category. Include photos for quicker attention.';
  }
  if (['view all mla', 'list of mla', 'all mla', 'mla list kerala', 'mla ലിസ്റ്റ്', 'എല്ലാ mla'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'കേരളത്തിലെ എല്ലാ MLA-കളുടെയും വിവരങ്ങൾ EnteMLA ഹോം പേജിൽ "MLA Directory" അല്ലെങ്കിൽ "Find Your MLA" സെക്ഷനിൽ കാണാം.'
    : 'You can view the complete list of Kerala MLAs under the "MLA Directory" or "Find Your MLA" section on the EnteMLA homepage.';
  }
  if (['what is dashboard', 'dashboard meaning', 'my dashboard', 'ഡാഷ്ബോർഡ്', 'dashboard എന്തിനാണ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'Dashboard നിങ്ങളുടെ പ്രൊഫൈൽ, ഇതുവരെ ഫയൽ ചെയ്ത പരാതികൾ, അവയുടെ സ്ഥിതി (Pending/In Progress/Resolved) എന്നിവ ഒറ്റ നോട്ടത്തിൽ കാണാൻ ഉതകുന്ന പ്രധാന പേജ് ആണ്.'
    : 'The Dashboard is your personal control panel showing your profile, all submitted complaints, and their current status (Pending / In Progress / Resolved) — all in one place.';
  }
  if (['change language', 'switch language', 'english to malayalam', 'malayalam to english', 'ഭാഷ മാറ്റാൻ', 'language change'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'പോർട്ടലിന്റെ മുകളിൽ ഉള്ള Language Toggle ഉപയോഗിച്ച് ഇംഗ്ലീഷ്, മലയാളം ഭാഷകൾ തമ്മിൽ മാറ്റാൻ സാധിക്കും.': 'You can switch between English and Malayalam using the Language Toggle button available at the top of the portal.';
  }
  if (['password strength', 'strong password', 'password rules', 'password requirement', 'പാസ്‌വേഡ് നിബന്ധന'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ശക്തമായ പാസ്‌വേഡ് ഉണ്ടാക്കാൻ:\n• കുറഞ്ഞത് 8 അക്ഷരങ്ങൾ\n• ഒരു Capital Letter\n• ഒരു Number\n• ഒരു Special Character (@, #, ! തുടങ്ങിയവ)'
    : 'For a strong password:\n• Minimum 8 characters\n• At least one capital letter\n• At least one number\n• At least one special character (@, #, !, etc.)';
  }
  if (['delete account', 'close account', 'remove account', 'അക്കൗണ്ട് ഡിലീറ്റ്', 'അക്കൗണ്ട് ക്ലോസ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'അക്കൗണ്ട് ഡിലീറ്റ് ചെയ്യണമെങ്കിൽ EnteMLA ഹെൽപ്ഡെസ്കുമായി ബന്ധപ്പെടുക. സ്വയം ഡിലീറ്റ് ചെയ്യാനുള്ള ഓപ്ഷൻ നിലവിൽ ലഭ്യമല്ല.'
    : 'To delete your account, please contact the EnteMLA helpdesk directly. A self-service account deletion option is not available at this time.';
  }
  if (['complaint not submitted', 'submission failed', 'error while submitting', 'submit ആകുന്നില്ല', 'പരാതി പോകുന്നില്ല'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'പരാതി Submit ആകുന്നില്ലെങ്കിൽ:\n• ഇന്റർനെറ്റ് കണക്ഷൻ ഉറപ്പാക്കുക\n• എല്ലാ നിർബന്ധ ഫീൽഡുകളും പൂരിപ്പിച്ചോ എന്ന് നോക്കുക\n• ഫയൽ 5MB-ൽ കൂടാൻ പാടില്ല\n• ബ്രൗസർ Refresh ചെയ്ത് വീണ്ടും ശ്രമിക്കുക'
    : 'If complaint submission fails:\n• Check your internet connection\n• Make sure all mandatory fields are filled\n• Ensure attached file is under 5MB\n• Refresh the browser and try again';
  }
  if (['what happens to my data', 'data usage', 'data policy', 'personal information usage', 'ഡേറ്റ എന്ത് ചെയ്യും', 'വ്യക്തിഗത വിവരം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'നിങ്ങളുടെ വ്യക്തിഗത വിവരങ്ങൾ (പേര്, ഫോൺ, വിലാസം) പരാതി പ്രോസസ്സ് ചെയ്യാൻ മാത്രം ഉപയോഗിക്കുന്നു. മൂന്നാം കക്ഷികൾക്ക് ഈ ഡേറ്റ ഒരിക്കലും കൈമാറില്ല.'
    : 'Your personal data (name, phone, address) is used only for processing your complaint. It is never shared with any third parties and is kept strictly confidential.';
  }
  if (['what is janasamparkan', 'janasamparkan meaning', 'public outreach', 'ജനസമ്പർക്ക', 'jana samparkan'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ജനസമ്പർക്ക പരിപാടി MLA-യും പൊതുജനങ്ങളും നേരിട്ട് ആശയ വിനിമയം നടത്തുന്ന ഒരു പൊതു പരിപാടി ആണ്. ഇതിൽ പ്രശ്നങ്ങൾ നേരിട്ട് MLA-യെ ബോധ്യപ്പെടുത്താം. EnteMLA-യിൽ ഷെഡ്യൂൾ "Contact Us" പേജിൽ കാണാം.'
    : 'Janasamparkan is a public outreach program where citizens can meet their MLA directly and raise issues in person. You can check the schedule on the "Contact Us" page of EnteMLA.';
  }
  if (['wrong category', 'selected wrong', 'category mistake', 'wrong type', 'തെറ്റായ കാറ്റഗറി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'തെറ്റായ കാറ്റഗറിയിൽ പരാതി ഫയൽ ചെയ്‌തെങ്കിൽ, Pending സ്റ്റാറ്റസ് ഉള്ളപ്പോൾ പിൻവലിച്ച് ശരിയായ കാറ്റഗറിയിൽ വീണ്ടും ഫയൽ ചെയ്യുക. In Progress ആയ ശേഷം മാറ്റം ആകില്ല.'
    : 'If you selected the wrong category, withdraw the complaint while it is still "Pending" and re-submit it under the correct category. Changes cannot be made once it moves to "In Progress".';
  }
  if (['number of complaints resolved', 'how many resolved', 'success rate', 'portal statistics', 'എത്ര പരാതി പരിഹരിച്ചു'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA-യിൽ ഇതുവരെ പരിഹരിച്ച പരാതികളുടെ കണക്ക് Home Page-ലെ Statistics അല്ലെങ്കിൽ Dashboard സെക്ഷനിൽ കാണാം.'
    : 'The count of complaints resolved so far through EnteMLA can be viewed in the Statistics or Dashboard section on the homepage.';
  }
  if (['session expired', 'logged out automatically', 'auto logout', 'സെഷൻ', 'ഓട്ടോ ലോഗ്ഔട്ട്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'സുരക്ഷ കാരണങ്ങളാൽ ഒരു നിശ്ചിത സമയം നിഷ്‌ക്രിയമായാൽ സെഷൻ ഓട്ടോമാറ്റിക്കായി അവസാനിക്കും. വീണ്ടും ലോഗിൻ ചെയ്ത് തുടരുക.'
    : 'For security reasons, your session will automatically expire after a period of inactivity. Simply log in again to continue where you left off.';
  }
  if (['change password', 'update password', 'new password', 'പാസ്‌വേഡ് മാറ്റണം', 'പുതിയ പാസ്‌വേഡ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'പാസ്‌വേഡ് മാറ്റാൻ ലോഗിൻ ചെയ്ത ശേഷം "Profile Settings" → "Change Password" സെക്ഷൻ ഉപയോഗിക്കുക. നിലവിലെ പാസ്‌വേഡും പുതിയ പാസ്‌വേഡും നൽകുക.'
    : 'To change your password, go to "Profile Settings" → "Change Password" after logging in. Enter your current password and set a new one.';
  }
  if (['complaint on behalf of group', 'community complaint', 'group complaint', 'village complaint', 'സമൂഹ പരാതി', 'കൂട്ടായ പരാതി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഒരു കൂട്ടായ പ്രശ്നം (ഉദാ: ഒരു മുഴുവൻ റോഡ് തകർന്നത്) ഒരു വ്യക്തിക്ക് സമർപ്പിക്കാം. Description-ൽ ഇത് ഒരു Community Issue ആണ് എന്ന് വ്യക്തമാക്കുക.'
    : 'A single person can file a complaint on behalf of a community (e.g., a whole road being damaged). Mention clearly in the description that this is a community-wide issue.';
  }
  if (['complaint during election', 'election time', 'model code', 'election complaint', 'തിരഞ്ഞെടുപ്പ് സമയം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'തിരഞ്ഞെടുപ്പ് കാലത്ത് ചില നടപടികൾ Model Code of Conduct കാരണം വൈകാം. എന്നാൽ EnteMLA-ൽ പരാതി സമർപ്പണം തുടരാം.'
    : 'During election periods, some actions may be delayed due to the Model Code of Conduct. However, you can still submit complaints through EnteMLA as usual.';
  }
  if (['print complaint', 'download complaint', 'complaint copy', 'print receipt', 'പരാതി പ്രിന്റ്', 'കോപ്പി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? '"My Complaints" സെക്ഷനിൽ നിന്ന് പരാതിയുടെ വിവരങ്ങൾ PDF ആയി ഡൗൺലോഡ് ചെയ്യാനോ Print ചെയ്യാനോ ഉള്ള ഓപ്ഷൻ ലഭ്യമാണ്.'
    : 'You can download or print a copy of your complaint from the "My Complaints" section. A PDF option is available for your records.';
  }
  if (['share complaint', 'share tracking', 'send complaint link', 'complaint link', 'പരാതി ഷെയർ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'നിലവിൽ പരാതി ലിങ്ക് നേരിട്ട് ഷെയർ ചെയ്യാൻ ഓപ്ഷൻ ഇല്ല. Tracking ID മറ്റൊരാൾക്ക് നൽകിയാൽ ബന്ധപ്പെട്ട ഉദ്യോഗസ്ഥർക്ക് ആ ID ഉപയോഗിച്ച് കണ്ടെത്താം.'
    : 'There is no direct link-sharing option for complaints. However, you can share your Tracking ID with relevant officials so they can look up your complaint easily.';
  }
  if (['government holiday', 'holiday', 'public holiday', 'complaint on holiday', 'അവധി ദിവസം', 'ഹോളിഡേ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA പോർട്ടൽ 24/7 ലഭ്യമാണ്. അവധി ദിവസങ്ങളിൽ പരാതി ഫയൽ ചെയ്യാം, എന്നാൽ ഓഫീസ് ടീം അടുത്ത പ്രവൃത്തി ദിവസം മാത്രം പ്രോസസ്സ് ചെയ്യും.'
    : 'The EnteMLA portal is available 24/7. You can file a complaint on public holidays, but the MLA office team will process it on the next working day.';
  }
  if (['what is pwD', 'pwd full form', 'kwa full form', 'kseb full form', 'pwd meaning', 'kwa meaning'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? '• PWD — Public Works Department (റോഡ്, പാലം)\n• KWA — Kerala Water Authority (കുടിവെള്ളം)\n• KSEB — Kerala State Electricity Board (വൈദ്യുതി)'
    : '• PWD — Public Works Department (Roads, Bridges)\n• KWA — Kerala Water Authority (Drinking Water)\n• KSEB — Kerala State Electricity Board (Electricity)';
  }
  if (['complaint not visible', 'complaint disappeared', 'missing complaint', 'complaint kanunnilla', 'പരാതി കാണുന്നില്ല'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ലോഗിൻ ചെയ്ത് "My Complaints" സെക്ഷൻ പരിശോധിക്കുക. ഇപ്പോഴും കാണുന്നില്ലെങ്കിൽ ബ്രൗസർ Refresh ചെയ്ത് ശ്രമിക്കുക. പ്രശ്നം തുടർന്നാൽ ഹെൽപ്ഡെസ്കുമായി Tracking ID സഹിതം ബന്ധപ്പെടുക.'
    : 'Log in and check your "My Complaints" section. If the complaint is still missing, refresh the browser and try again. If the problem continues, contact the helpdesk with your Tracking ID.';
  }
  if (['how to logout', 'sign out', 'log out', 'ലോഗ് ഔട്ട്', 'സൈൻ ഔട്ട്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ലോഗ്ഔട്ട് ചെയ്യാൻ ഡാഷ്ബോർഡിന്റെ മുകളിൽ വലതുഭാഗത്തുള്ള "Logout" ബട്ടൺ ക്ലിക്ക് ചെയ്യുക. പൊതു ഉപകരണങ്ങൾ ഉപയോഗിക്കുമ്പോൾ എല്ലായ്‌പ്പോഴും ലോഗ്ഔട്ട് ചെയ്യുക.'
    : 'To log out, click the "Logout" button at the top right corner of your dashboard. Always log out when using a shared or public device for your security.';
  }
  if (['tablet', 'ipad', 'laptop', 'desktop', 'computer', 'ടാബ്ലറ്', 'ലാപ്ടോപ്', 'കമ്പ്യൂട്ടർ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA മൊബൈൽ, ടാബ്ലറ്, ലാപ്ടോപ്, ഡെസ്ക്ടോപ്പ് എന്നിവ ഉൾപ്പെടെ ഏത് ഉപകരണത്തിലും Chrome, Firefox, Edge ബ്രൗസർ വഴി ആക്സസ് ചെയ്യാം.'
    : 'EnteMLA is accessible on any device including mobile, tablet, laptop, and desktop through Chrome, Firefox, or Edge browsers.';
  }
  if (['how to find mla', 'search mla', 'find my mla', 'locate mla', 'mla കണ്ടെത്താൻ', 'ഏത് mla'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'നിങ്ങളുടെ MLA-യെ കണ്ടെത്താൻ EnteMLA-ൽ "Find Your MLA" സെക്ഷനിൽ ജില്ല അല്ലെങ്കിൽ മണ്ഡലം നൽകി തിരയാം. Voter ID-ലും ഈ വിവരം ഉണ്ടാകും.'
    : 'To find your MLA, use the "Find Your MLA" section on EnteMLA by searching your district or constituency name. Your Voter ID card also mentions your constituency.';
  }
  if (['complaint priority', 'urgent complaint', 'high priority', 'priority complaint', 'അടിയന്തിര പരാതി', 'പ്രാധാന്യം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഇപ്പോൾ പ്രത്യേക Priority ലെവൽ ഫീൽഡ് ഇല്ല. എന്നിരുന്നാലും Description-ൽ "Urgent" അല്ലെങ്കിൽ "Emergency" എന്ന് വ്യക്തമായി എഴുതുകയും ഫോട്ടോ ചേർക്കുകയും ചെയ്‌താൽ ടീം വേഗം ശ്രദ്ധിക്കും.'
    : 'There is no separate priority field currently. However, clearly writing "Urgent" or "Emergency" in the description and attaching photos will help the team notice and act on it faster.';
  }
  if (['account suspended', 'account blocked', 'account locked', 'account ban', 'അക്കൗണ്ട് ബ്ലോക്ക്', 'സസ്പെൻഡ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഒന്നിലധികം വ്യാജ പരാതികൾ ഫയൽ ചെയ്‌താൽ അക്കൗണ്ട് സസ്പെൻഡ് ആകാം. ഇത് പരിഹരിക്കാൻ EnteMLA ഹെൽപ്ഡെസ്കുമായി ബന്ധപ്പെടുക.'
    : 'Accounts may get suspended for filing multiple false or spam complaints. To resolve a suspension, contact the EnteMLA helpdesk with your registered mobile number.';
  }
  if (['how is complaint verified', 'who verifies', 'verification process', 'check complaint', 'പരാതി ആര് പരിശോധിക്കും', 'വെരിഫിക്കേഷൻ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'സമർപ്പിച്ച പരാതി ആദ്യം MLA ഓഫീസ് ടീം പരിശോധിക്കും. ശേഷം കാറ്റഗറി അനുസരിച്ച് ബന്ധപ്പെട്ട സർക്കാർ വകുപ്പിലേക്ക് (PWD, KWA, KSEB) കൈമാറും. ഓരോ ഘട്ടത്തിലും സ്റ്റാറ്റസ് അപ്ഡേറ്റ് ആകും.'
    : 'Once submitted, your complaint is first verified by the MLA office team. It is then forwarded to the relevant government department (PWD, KWA, KSEB) based on category. Status is updated at each stage.';
  }
  if (['can mla reject', 'mla refuse', 'mla will not help', 'mla ignore', 'mla സഹായിക്കുന്നില്ല', 'mla നിരസിക്കും'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'MLA ഓഫീസ് പരാതി നിരസിക്കുകയാണെങ്കിൽ "Rejected" സ്റ്റാറ്റസും കൃത്യമായ കാരണവും ഡാഷ്ബോർഡിൽ കാണിക്കും. കാരണം പരിഹരിച്ച് പുതിയ പരാതി ഫയൽ ചെയ്യുക.'
    : 'If the MLA office rejects a complaint, the dashboard will show "Rejected" status along with the specific reason. You can address the reason and re-submit a new complaint.';
  }
  if (['best time to submit', 'when to submit', 'submit complaint timing', 'right time', 'ഏത് സമയം', 'ശരിയായ സമയം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA 24/7 ലഭ്യമാണ്, ഏത് സമയത്തും പരാതി ഫയൽ ചെയ്യാം. എന്നിരുന്നാലും ഓഫീസ് ടീം തിങ്കൾ–ശനി, 10AM–5PM ആണ് പ്രോസസ്സ് ചെയ്യുന്നത്. ആ സമയത്ത് ഫയൽ ചെയ്‌താൽ വേഗം ശ്രദ്ധ ലഭിക്കും.'
    : 'EnteMLA is available 24/7, so you can submit anytime. However, since the office team processes complaints Monday–Saturday between 10AM–5PM, filing during those hours may get faster attention.';
  }
  if (['what is otp', 'otp meaning', 'otp full form', 'otp എന്താണ്', 'otp എന്നാൽ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'OTP എന്നാൽ One Time Password. ഇത് നിങ്ങളുടെ മൊബൈൽ നമ്പർ ആധികാരികമാണ് എന്ന് ഉറപ്പാക്കാൻ ഒരു തവണ മാത്രം ഉപയോഗിക്കാവുന്ന രഹസ്യ നമ്പർ ആണ്. OTP 5 മിനിറ്റ് മാത്രം സാധുതയുള്ളതാണ്.'
    : 'OTP stands for One Time Password. It is a temporary secret code sent to your mobile number to verify your identity. The OTP is valid for 5 minutes only.';
  }
  if (['complaint in english','website in english','submit in english', 'english complaint', 'ഇംഗ്ലീഷിൽ പരാതി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'അതെ! ഇംഗ്ലീഷിലും പരാതി സമർപ്പിക്കാം. EnteMLA ഇംഗ്ലീഷ്, മലയാളം രണ്ട് ഭാഷകളിലും പൂർണ്ണ പിന്തുണ നൽകുന്നു.'
    : 'Yes! You can submit your complaint in English. EnteMLA fully supports both English and Malayalam for all complaint submissions.';
  }
  if (['complaint in malayalam','website in malayalam','submit in malayalam', 'malayalam complaint', 'മലയാളത്തിൽ പരാതി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'അതെ! മലയാളത്തിലും പരാതി സമർപ്പിക്കാം. EnteMLA ഇംഗ്ലീഷ്, മലയാളം രണ്ട് ഭാഷകളിലും പൂർണ്ണ പിന്തുണ നൽകുന്നു.'
    : 'Yes! You can submit your complaint in Malayalam. EnteMLA fully supports both English and Malayalam for all complaint submissions.';
  }
  if (['how to attach photo', 'upload image', 'add photo', 'photo attach', 'ഫോട്ടോ എങ്ങനെ', 'ചിത്രം ചേർക്കാൻ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'പരാതി ഫോമിൽ "Attach Photo / Document" ബട്ടൺ ക്ലിക്ക് ചെയ്ത് ഗ്യാലറിയിൽ നിന്ന് ഫോട്ടോ തിരഞ്ഞെടുക്കുക. ഫോർമാറ്റ്: JPG, PNG. പരമാവധി വലിപ്പം: 5MB.'
    : 'Click the "Attach Photo / Document" button in the complaint form and select a photo from your gallery. Supported formats: JPG, PNG. Maximum size: 5MB.';
  }
  if (['wrong phone number', 'registered wrong number', 'wrong mobile', 'തെറ്റായ നമ്പർ', 'wrong number registered'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'തെറ്റായ മൊബൈൽ നമ്പർ ഉപയോഗിച്ച് രജിസ്റ്റർ ചെയ്‌തെങ്കിൽ EnteMLA ഹെൽപ്ഡെസ്കുമായി ബന്ധപ്പെടുക. സ്വയം നമ്പർ തിരുത്താൻ ഓപ്ഷൻ ഇല്ല, ഹെൽപ്ഡെസ്ക് മാത്രം ഇത് ചെയ്യും.'
    : 'If you registered with a wrong mobile number, contact the EnteMLA helpdesk immediately. Self-correction is not allowed for mobile numbers — only the helpdesk can update it for security reasons.';
  }
  if (['water supply problem', 'no water', 'water not coming', 'pipe leak', 'കുടിവെള്ളം', 'വെള്ളം വരുന്നില്ല', 'പൈപ്പ് ലീക്ക്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'കുടിവെള്ള മുടക്കം, പൈപ്പ് ലീക്ക്, വെള്ള ദൗർലഭ്യം എന്നിവ "KWA / Water Supply" കാറ്റഗറിയിൽ ഫയൽ ചെയ്യുക. കൃത്യമായ സ്ഥലം, വാർഡ് നമ്പർ ഉൾപ്പെടുത്തുക.'
    : 'Water supply disruptions, pipe leaks, or shortage of drinking water can be filed under the "KWA / Water Supply" category. Include your exact location and ward number.';
  }
  if (['power cut', 'no electricity', 'transformer issue', 'low voltage', 'current illa', 'വൈദ്യുതി മുടക്കം', 'കറന്റ് ഇല്ല'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'വൈദ്യുതി മുടക്കം, ട്രാൻസ്ഫോർമർ തകരാർ, ലോ വോൾട്ടേജ് പ്രശ്നങ്ങൾ "KSEB / Electricity" കാറ്റഗറിയിൽ ഫയൽ ചെയ്യുക. ഫോൺ നമ്പർ ഉൾപ്പെടുത്തിയാൽ KSEB നേരിട്ട് ബന്ധപ്പെടും.'
    : 'Power cuts, transformer failures, or low voltage issues can be filed under the "KSEB / Electricity" category. Including your phone number helps KSEB contact you directly.';
  }
  if (['complaint response time', 'how fast', 'quick response', 'fast resolution', 'വേഗം പരിഹരിക്കും', 'എത്ര വേഗം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഒരു സാധാരണ പരാതിക്ക് 48 മണിക്കൂർ മുതൽ 7 പ്രവൃത്തി ദിവസം വരെ സമയമെടുക്കാം. ഫോട്ടോ ഉൾപ്പെടുത്തിയ, കൃത്യമായ വിവരങ്ങളുള്ള പരാതികൾ വേഗത്തിൽ പരിഹരിക്കപ്പെടാൻ സാധ്യത കൂടുതലാണ്.'
    : 'A typical complaint takes 48 hours to 7 working days. Complaints with clear descriptions and supporting photos are more likely to be resolved faster.';
  }
  if (['what if department wrong', 'forwarded to wrong dept', 'wrong department', 'wrong dept', 'തെറ്റായ വകുപ്പ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'MLA ഓഫീസ് ടീം പരാതി ശരിയായ വകുപ്പിലേക്ക് ഫോർവേഡ് ചെയ്യാൻ ഉത്തരവാദിത്വമുള്ളവരാണ്. തെറ്റ് സംഭവിച്ചെങ്കിൽ Tracking ID ഉപയോഗിച്ച് ഹെൽപ്ഡെസ്കുമായി ബന്ധപ്പെടുക.'
    : 'The MLA office team is responsible for forwarding your complaint to the correct department. If a mistake occurs, contact the helpdesk with your Tracking ID for correction.';
  }
  if (['how to write location', 'location details', 'address format', 'location format', 'സ്ഥലം എങ്ങനെ', 'വിലാസം എഴുതാൻ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'കൃത്യമായ സ്ഥലം നൽകാൻ:\n• വീടിന്റെ / സ്ഥലത്തിന്റെ പേര്\n• റോഡ് / തെരുവ് പേര്\n• വാർഡ് / പഞ്ചായത്ത്\n• ലാൻഡ്മാർക്ക് (ഉദാ: ആശുപത്രിക്ക് അടുത്ത്)\nഈ വിവരങ്ങൾ ഉൾപ്പെടുത്തിയാൽ വേഗം പ്രശ്നം കണ്ടെത്താം.'
    : 'To provide accurate location details:\n• House / place name\n• Road / street name\n• Ward / Panchayat name\n• Nearby landmark (e.g., near hospital)\nThese details help officials locate the issue quickly.';
  }
  if (['government scheme complaint', 'pradhan mantri', 'central scheme', 'central government', 'കേന്ദ്ര സർക്കാർ', 'പ്രധാൻ മന്ത്രി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA കേരള സംസ്ഥാന തലത്തിലെ MLA-കൾക്ക് മാത്രം ബന്ധപ്പെട്ട പ്രശ്നങ്ങൾ കൈകാര്യം ചെയ്യുന്നു. കേന്ദ്ര സർക്കാർ പദ്ധതി പ്രശ്നങ്ങൾ MP-യോ കേന്ദ്ര ഗ്രീവൻസ് പോർട്ടൽ (CPGRAMS) വഴിയോ പരിഹരിക്കുക.'
    : 'EnteMLA handles issues related to Kerala State MLAs only. For central government scheme problems, contact your MP or use the Central Grievance Portal (CPGRAMS) at pgportal.gov.in.';
  }
  if (['who sees my complaint', 'complaint visibility', 'who can access', 'ആർക്ക് കാണാം', 'പരാതി ആർ കാണും'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'നിങ്ങളുടെ പരാതി MLA ഓഫീസ് ടീം, ബന്ധപ്പെട്ട സർക്കാർ ഉദ്യോഗസ്ഥർ എന്നിവർക്ക് മാത്രം കാണാൻ കഴിയും. മറ്റ് പൗരന്മാർക്ക് ഇത് ദൃശ്യമല്ല.'
    : 'Your complaint is visible only to the MLA office team and the concerned government officials. Other citizens cannot view your complaint details at any point.';
  }
  if (['complaint category list', 'all categories', 'available categories', 'list of categories', 'കാറ്റഗറി ലിസ്റ്റ്', 'എല്ലാ കാറ്റഗറി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA-ൽ ലഭ്യമായ കാറ്റഗറികൾ:\n• PWD (റോഡ്, പാലം)\n• KWA (കുടിവെള്ളം)\n• KSEB (വൈദ്യുതി)\n• Health (ആരോഗ്യം)\n• Education (വിദ്യാഭ്യാസം)\n• Housing (ഭവനം)\n• Administrative / Others'
    : 'Available complaint categories in EnteMLA:\n• PWD (Roads, Bridges)\n• KWA (Water Supply)\n• KSEB (Electricity)\n• Health\n• Education\n• Housing\n• Administrative / Others';
  }
  if (['no smartphone', 'basic phone', 'keypad phone', 'feature phone', 'സ്മാർട്ട്ഫോൺ ഇല്ല', 'കീപാഡ് ഫോൺ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA ഒരു വെബ് പോർട്ടൽ ആണ്. സ്മാർട്ട്ഫോൺ ഇല്ലെങ്കിൽ അടുത്തുള്ള Common Service Centre (CSC / Akshaya Centre) സന്ദർശിക്കുക. അവർ സഹായത്തോടെ പരാതി ഫയൽ ചെയ്യാൻ കഴിയും.'
    : 'EnteMLA is a web portal that requires a smartphone or computer. If you do not have one, visit your nearest Common Service Centre (CSC / Akshaya Centre) for assisted complaint filing.';
  }
  if (['akshaya', 'csc', 'common service centre', 'akshaya centre', 'അക്ഷയ', 'അക്ഷയ സെന്റർ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഇന്റർനെറ്റ് അല്ലെങ്കിൽ സ്മാർട്ട്ഫോൺ ഇല്ലാത്തവർക്ക് അടുത്തുള്ള അക്ഷയ സെന്ററിൽ ചെന്ന് EnteMLA-ൽ പരാതി ഫയൽ ചെയ്യാൻ സഹായം ആവശ്യപ്പെടാം.'
    : 'Citizens without internet or smartphones can visit their nearest Akshaya Centre (Common Service Centre) and request assistance to file a complaint on EnteMLA.';
  }
  if (['senior citizen', 'elderly', 'old age', 'disabled', 'specially abled', 'മുതിർന്ന പൗരൻ', 'വൃദ്ധർ', 'വൃദ്ധ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'മുതിർന്ന പൗരന്മാർക്കും ഭിന്നശേഷിക്കാർക്കും EnteMLA ഉപയോഗിക്കാൻ ബുദ്ധിമുട്ടുണ്ടെങ്കിൽ കുടുംബാംഗങ്ങൾ സഹായിക്കുകയോ അടുത്തുള്ള അക്ഷയ സെന്ററിൽ നിന്ന് സഹായം തേടുകയോ ചെയ്യാം.'
    : 'Senior citizens or differently-abled individuals who find it difficult to use EnteMLA can get help from family members or visit the nearest Akshaya Centre for assisted complaint filing.';
  }
  if (['how portal helps mla', 'benefit for mla', 'mla benefit', 'mla portal use', 'mla എങ്ങനെ ഉപകരിക്കും'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA MLA-കളെ ഇങ്ങനെ സഹായിക്കുന്നു:\n• ഒരൊറ്റ ഡാഷ്ബോർഡ് വഴി എല്ലാ പരാതികളും കാണാം\n• പ്രദേശ തിരിച്ചുള്ള പ്രശ്നങ്ങൾ മനസ്സിലാക്കാം\n• ഡിജിറ്റൽ രേഖകൾ സൂക്ഷിക്കാം\n• ജനങ്ങളുമായി ഫലപ്രദമായി ബന്ധപ്പെടാം'
    : 'EnteMLA helps MLAs by:\n• Viewing all complaints in a single dashboard\n• Understanding area-wise civic problems\n• Maintaining digital records\n• Communicating effectively with constituents';
  }
  if (['portal future', 'new features coming', 'upcoming features', 'roadmap', 'future update', 'പുതിയ ഫീച്ചർ', 'ഭാവി പദ്ധതി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA നിരന്തരം മെച്ചപ്പെടുത്തി കൊണ്ടിരിക്കുന്നു. ഉടൻ വരാൻ പോകുന്ന ഫീച്ചറുകൾ: മൊബൈൽ ആപ്പ്, Multilingual Support, Real-time Chat with MLA Office. ഏറ്റവും പുതിയ വിവരങ്ങൾ "Contact Us" പേജ് വഴി അറിയാം.'
    : 'EnteMLA is continuously improving. Upcoming features include a dedicated Mobile App, Multilingual Support, and Real-time Chat with the MLA office. Check the "Contact Us" page for the latest updates.';
  }
  if (['how many complaints per mla', 'mla complaint count', 'mla statistics', 'mla performance', 'mla എത്ര പരാതി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഓരോ MLA-യുടെ ഡാഷ്ബോർഡിലും ആ മണ്ഡലത്തിൽ നിന്ന് ലഭിച്ച മൊത്തം പരാതികൾ, Pending, In Progress, Resolved എന്നിവയുടെ കണക്ക് ലഭ്യമാണ്.'
    : 'Each MLA dashboard displays the total complaints received from their constituency along with the count of Pending, In Progress, and Resolved complaints.';
  }
  if (['complaint acknowledgement', 'confirmation message', 'submission confirmation', 'complaint received message', 'പരാതി ലഭിച്ചു', 'confirm message'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'പരാതി വിജയകരമായി സമർപ്പിക്കുമ്പോൾ:\n• സ്ക്രീനിൽ Confirmation Message ദൃശ്യമാകും\n• Tracking ID ലഭിക്കും\n• രജിസ്റ്റർ ചെയ്ത നമ്പറിലേക്ക് SMS ലഭിക്കും'
    : 'When your complaint is successfully submitted:\n• A Confirmation Message appears on screen\n• You receive a unique Tracking ID\n• An SMS is sent to your registered mobile number';
  }
  if (['report chatbot issue', 'chatbot wrong answer', 'chatbot error', 'bot not working', 'ചാറ്റ്ബോട്ട് തെറ്റ്', 'ബോട്ട് പ്രവർത്തിക്കുന്നില്ല'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ചാറ്റ്ബോട്ട് തെറ്റായ ഉത്തരം നൽകുകയോ പ്രവർത്തിക്കാതിരിക്കുകയോ ചെയ്‌താൽ "Contact Us" പേജ് വഴി ഹെൽപ്ഡെസ്കിനെ അറിയിക്കുക. നിങ്ങളുടെ ഫീഡ്ബാക്ക് ബോട്ട് മെച്ചപ്പെടുത്താൻ സഹായിക്കും.'
    : 'If the chatbot gives a wrong answer or stops working, please report it through the "Contact Us" page. Your feedback directly helps us improve the chatbot experience for everyone.';
  }
  if (['what is ward', 'ward meaning', 'ward number', 'ward എന്താണ്', 'വാർഡ് നമ്പർ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'വാർഡ് എന്നാൽ ഒരു നഗരസഭ അല്ലെങ്കിൽ പഞ്ചായത്തിനെ ചെറിയ ഭരണ യൂണിറ്റുകളായി തിരിക്കുന്നതിന്റെ ഒരു ഭാഗം ആണ്. നിങ്ങളുടെ Voter ID കാർഡിൽ വാർഡ് നമ്പർ കണ്ടെത്താം.'
    : 'A ward is a small administrative unit within a municipality or panchayat. You can find your ward number on your Voter ID card or by contacting your local panchayat office.';
  }
  if (['complaint for road accident', 'accident prone area', 'accident spot', 'dangerous road', 'അപകടം', 'അപകട പ്രദേശം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'അപകടം ഉണ്ടാകാൻ സാധ്യതയുള്ള റോഡ്, വഴി, ബ്രിഡ്ജ് പ്രശ്നങ്ങൾ "PWD / Road" കാറ്റഗറിയിൽ ഫോട്ടോ സഹിതം ഫയൽ ചെയ്യുക. ഇത്തരം പരാതികൾ MLA ഓഫീസ് മുൻഗണന നൽകി കൈകാര്റ്റൽ ചെയ്യുന്നതാണ്.'
    : 'Accident-prone roads, broken bridges, or dangerous pathways can be filed under "PWD / Road" category with supporting photos. Such complaints are treated with higher priority by the MLA office.';
  }
  if (['illegal construction', 'unauthorized building', 'building violation', 'encroach', 'അനധികൃത നിർമ്മാണം', 'കൈയ്യേറ്റ നിർമ്മാണം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'അനധികൃത നിർമ്മാണം, കൈയ്യേറ്റം, Building Code ലംഘനം എന്നിവ "Administrative / Others" കാറ്റഗറിയിൽ ഫോട്ടോ തെളിവ് ഉൾപ്പെടുത്തി ഫയൽ ചെയ്യുക.'
    : 'Illegal construction, encroachment, or building code violations can be reported under "Administrative / Others" category. Always attach photo evidence to strengthen your complaint.';
  }
  if (['stray dog', 'stray animal', 'animal menace', 'dog bite', 'തെരുവ് നായ', 'മൃഗ ശല്യം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'തെരുവ് നായ ശല്യം, മൃഗ ആക്രമണം എന്നിവ "Administrative / Others" കാറ്റഗറിയിൽ ഫയൽ ചെയ്യുക. അടിയന്തിര ചികിത്സ ആവശ്യമെങ്കിൽ 112 ൽ വിളിക്കുക.'
    : 'Stray dog menace or animal attacks can be filed under "Administrative / Others". For immediate medical attention after an animal bite, call the emergency helpline at 112.';
  }
  if (['public toilet', 'sanitation', 'open defecation', 'toilet facility', 'പൊതു ടോയ്‌ലറ്റ്', 'ശുചിത്വം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'പൊതു ടോയ്‌ലറ്റ് സൗകര്യക്കുറവ്, ശുചിത്വ പ്രശ്നങ്ങൾ, തുറസ്സായ സ്ഥലത്ത് മലമൂത്ര വിസർജ്ജനം എന്നിവ "Administrative / Others" കാറ്റഗറിയിൽ ഫയൽ ചെയ്യുക.'
    : 'Lack of public toilet facilities, sanitation issues, or open defecation problems can be reported under the "Administrative / Others" category for prompt attention.';
  }
  if (['internet connection problem', 'wifi issue', 'data not working', 'slow internet', 'ഇന്റർനെറ്റ് ഇല്ല', 'ഡേറ്റ പോകുന്നില്ല'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA ഉപയോഗിക്കാൻ സ്ഥിരമായ ഇന്റർനെറ്റ് കണക്ഷൻ ആവശ്യമാണ്. WiFi അല്ലെങ്കിൽ മൊബൈൽ ഡേറ്റ ഉപയോഗിക്കാം. ഇന്റർനെറ്റ് ഇല്ലെങ്കിൽ അടുത്തുള്ള അക്ഷയ സെന്ററിൽ ചെന്ന് ഫയൽ ചെയ്യുക.'
    : 'A stable internet connection is required to use EnteMLA. You can use WiFi or mobile data. If you have no internet access, visit the nearest Akshaya Centre for assistance.';
  }
  if (['complaint for corruption in school', 'teacher absent', 'school fund misuse', 'school corruption', 'സ്കൂൾ അഴിമതി', 'അദ്ധ്യാപകൻ വരുന്നില്ല'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'സ്കൂൾ ഫണ്ട് ദുരുപയോഗം, അദ്ധ്യാപകരുടെ അഴിമതി, ക്രമക്കേടുകൾ എന്നിവ "Education" കാറ്റഗറിയിൽ കൃത്യമായ തെളിവ് ഉൾപ്പെടുത്തി ഫയൽ ചെയ്യുക.'
    : 'School fund misuse, teacher absenteeism, or educational corruption issues can be filed under the "Education" category. Provide specific details and evidence for faster action.';
  }
  if (['manglish', 'type in manglish', 'manglish support', 'മംഗ്ലീഷ്', 'manglish parathi'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'അതെ! EnteMLA ചാറ്റ്ബോട്ടിൽ Manglish (ഇംഗ്ലീഷ് അക്ഷരത്തിൽ മലയാളം) ഉപയോഗിച്ച് ചോദ്യങ്ങൾ ചോദിക്കാം. ഉദാ: "parathi engane file cheyyam" എന്ന് ടൈപ്പ് ചെയ്‌താൽ മതി.'
    : 'Yes! You can type in Manglish (Malayalam written using English letters) in the EnteMLA chatbot. For example, typing "parathi engane file cheyyam" will be understood by the system.';
  }
  if (['complaint for missing person', 'person missing', 'child missing', 'missing report', 'കാണാതായ വ്യക്തി', 'കുട്ടി കാണാതായി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA അടിയന്തിര സഹായ പോർട്ടൽ അല്ല. കാണാതായ വ്യക്തിയെ കുറിച്ച് ഉടൻ പോലീസ് സ്റ്റേഷനിൽ FIR ഫയൽ ചെയ്യുക അല്ലെങ്കിൽ 112 ൽ വിളിക്കുക.'
    : 'EnteMLA is not an emergency portal. For missing persons, immediately file an FIR at the nearest police station or call the emergency helpline at 112.';
  }
  if (['complaint against police', 'police misconduct', 'police complaint', 'പോലീസ് പരാതി', 'പോലീസ് ദുർനടപ്പ്'].some(w => q.includes(w))) {    return lang === 'Malayalam'
    ? 'പോലീസ് ദുർനടപ്പിനെതിരെ Kerala Police Complaint Authority (KPCA) അല്ലെങ്കിൽ ജില്ലാ Police Superintendent-ന് പരാതി നൽകുക. EnteMLA-ൽ "Administrative / Others" കാറ്റഗറിയിൽ MLA-യ്ക്ക് ശ്രദ്ധയിൽ പെടുത്താം.'
    : 'For police misconduct, file a complaint with the Kerala Police Complaint Authority (KPCA) or District Superintendent of Police. You can also bring it to the MLA\'s attention via "Administrative / Others" on EnteMLA.';
  }
  if (['complaint for flood relief', 'disaster relief', 'natural disaster', 'flood', 'landslide', 'വെള്ളപ്പൊക്കം', 'ദുരന്ത ദുരിതാശ്വാസം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'വെള്ളപ്പൊക്കം, ഉരുൾപൊട്ടൽ, പ്രകൃതി ദുരന്തം എന്നിവ EnteMLA-ൽ "Administrative / Others" കാറ്റഗറിയിൽ ഫയൽ ചെയ്‌ത് MLA-യുടെ ശ്രദ്ധയിൽ കൊണ്ടുവരാം. അടിയന്തിര ദുരിതാശ്വാസത്തിന് 1077 ൽ വിളിക്കുക.'
    : 'Flood or landslide damage can be reported under "Administrative / Others" to bring it to the MLA\'s attention. For immediate disaster relief, call the Kerala Disaster Helpline at 1077.';
  }
  if (['how to give good description', 'describe problem', 'what to write in description', 'description tips', 'description എങ്ങനെ', 'വിവരണം എഴുതാൻ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'നല്ല വിവരണം എഴുതാൻ:\n• പ്രശ്നം എന്ത് എന്ന് കൃത്യമായി പറയുക\n• പ്രശ്നം തുടങ്ങിയ തീയതി ഉൾപ്പെടുത്തുക\n• ബാധിക്കപ്പെട്ട ആളുകളുടെ എണ്ണം പറയുക\n• ഇതിന് മുൻപ് ഇക്കാര്യം ആർക്കെങ്കിലും അറിയിച്ചോ എന്ന് പറയുക'
    : 'To write a good description:\n• Clearly state what the problem is\n• Mention when the issue started\n• State how many people are affected\n• Mention if you have previously reported this to anyone';
  }
  if (['what is pwD complaint', 'road complaint process', 'pwd process', 'pwd parathi', 'PWD പരാതി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'PWD (Public Works Department) കാറ്റഗറിയിൽ പരാതി ഫയൽ ചെയ്‌താൽ:\n1. MLA ഓഫീസ് പരിശോധിക്കും\n2. PWD എഞ്ചിനീയർക്ക് കൈമാറും\n3. സൈറ്റ് ഇൻസ്പെക്ഷൻ നടക്കും\n4. അനുമതി ലഭിച്ചാൽ ജോലി ആരംഭിക്കും'
    : 'When a PWD complaint is filed:\n1. MLA office reviews it\n2. Forwarded to PWD Engineer\n3. Site inspection is conducted\n4. Work begins after approval and budget sanction';
  }
  if (['night complaint', 'late night', 'submit at night', 'രാത്രി പരാതി', 'രാത്രിയിൽ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA 24/7 ലഭ്യമാണ്, രാത്രിയിലും പരാതി ഫയൽ ചെയ്യാം. MLA ഓഫീസ് ടീം അടുത്ത പ്രവൃത്തി ദിവസം (10AM–5PM) ഇത് പ്രോസസ്സ് ചെയ്യും.'
    : 'EnteMLA is available 24/7 so you can file a complaint at night too. The MLA office team will process it on the next working day between 10AM and 5PM.';
  }
  if (['complaint for park', 'playground', 'public space', 'park maintenance', 'പൊതു ഇടം', 'കളിസ്ഥലം', 'പാർക്ക്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'പൊതു പാർക്ക്, കളിസ്ഥലം, പൊതു ഇടം പരിപാലന പ്രശ്നങ്ങൾ "Administrative / Others" കാറ്റഗറിയിൽ ഫോട്ടോ ഉൾപ്പെടുത്തി ഫയൽ ചെയ്യുക.'
    : 'Poor maintenance of public parks, playgrounds, or public spaces can be reported under "Administrative / Others" category. Attach photos to clearly show the condition.';
  }
  if (['complaint for market', 'shop', 'price hike', 'overpricing', 'market issue', 'കട', 'മാർക്കറ്റ്', 'വില കൂടുതൽ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'വിലക്കയറ്റം, അളവ് കൂടുതൽ ഈടാക്കൽ, മാർക്കറ്റ് ക്രമക്കേടുകൾ "Administrative / Others" കാറ്റഗറിയിൽ ഫയൽ ചെയ്‌ത് MLA-യ്ക്ക് ശ്രദ്ധയിൽ കൊണ്ടുവരാം.'
    : 'Price hikes, overcharging, or market irregularities can be reported under "Administrative / Others" to bring it to the MLA\'s attention for necessary action.';
  }
  if (['complaint for bridge repair', 'bridge damage', 'bridge broken', 'പാലം തകർന്നു', 'പാലം അപകടം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'പാലം തകർച്ച, പാലം അപകടം, ഭയാനകമായ അവസ്ഥ എന്നിവ "PWD / Road" കാറ്റഗറിയിൽ ഉടൻ ഫോട്ടോ സഹിതം ഫയൽ ചെയ്യുക. ഇത്തരം പരാതികൾ ഉടൻ ശ്രദ്ധ ലഭിക്കും.'
    : 'Bridge damage, dangerous bridge conditions, or structural failures must be filed immediately under "PWD / Road" with photos. Such complaints receive urgent attention from the MLA office.';
  }
  if (['complaint confidential', 'is my name shown', 'name visible', 'complaint anonymous to department', 'പേര് കാണിക്കുമോ', 'രഹസ്യ പരാതി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'നിങ്ങളുടെ പേരും ഫോൺ നമ്പറും MLA ഓഫീസിനും ബന്ധപ്പെട്ട ഉദ്യോഗസ്ഥർക്കും മാത്രം ദൃശ്യമാകും. പൊതുജനങ്ങൾക്ക് ഇത് കാണാൻ കഴിയില്ല. നിങ്ങളുടെ വ്യക്തിഗത വിവരം പൂർണ്ണ സ്വകാര്യതയോടെ സൂക്ഷിക്കും.'
    : 'Your name and phone number are visible only to the MLA office and concerned officials. The general public cannot see your personal details. Your information is kept fully confidential.';
  }
  if (['can i add more info', 'add details later', 'update complaint', 'add information', 'കൂടുതൽ വിവരം', 'ഇൻഫർമേഷൻ ചേർക്കാൻ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'സമർപ്പിച്ചതിന് ശേഷം പരാതിയിൽ നേരിട്ട് കൂടുതൽ വിവരങ്ങൾ ചേർക്കാൻ കഴിയില്ല. Pending ആണെങ്കിൽ പിൻവലിച്ച് കൂടുതൽ വിവരങ്ങൾ ഉൾപ്പെടുത്തി പുതിയ പരാതി ഫയൽ ചെയ്യുക.'
    : 'You cannot directly add more information to a complaint after submission. If it is still "Pending", withdraw it and re-submit with the additional details included.';
  }
  if (['what is mla office', 'mla office meaning', 'mla office work', 'mla office ചെയ്യുന്നത്', 'mla ഓഫീസ് ജോലി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'MLA ഓഫീസ് ടീം EnteMLA-ൽ:\n• പ്രതിദിനം പരാതികൾ പരിശോധിക്കുന്നു\n• ബന്ധപ്പെട്ട വകുപ്പുകൾക്ക് ഫോർവേഡ് ചെയ്യുന്നു\n• സ്റ്റാറ്റസ് അപ്ഡേറ്റ് ചെയ്യുന്നു\n• ജനങ്ങൾക്ക് SMS അറിയിപ്പ് അയക്കുന്നു'
    : 'The MLA office team on EnteMLA:\n• Reviews complaints daily\n• Forwards them to relevant departments\n• Updates complaint status regularly\n• Sends SMS notifications to citizens';
  }
  if (['what is constituency', 'constituency meaning', 'constituency എന്താണ്', 'മണ്ഡലം എന്നാൽ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'നിയമസഭാ മണ്ഡലം (Constituency) എന്നത് ഒരു MLA-യെ തിരഞ്ഞെടുക്കുന്ന ഒരു നിശ്ചിത ഭൂമിശാസ്ത്ര പ്രദേശം ആണ്. കേരളത്തിൽ ആകെ 140 നിയമസഭാ മണ്ഡലങ്ങൾ ഉണ്ട്. ഓരോ മണ്ഡലത്തിലും ഒരു MLA ജനങ്ങളെ പ്രതിനിധീകരിക്കുന്നു.'
    : 'A constituency is a defined geographical area from which one MLA is elected. Kerala has 140 Assembly Constituencies in total. Each MLA represents the citizens of their respective constituency.';
  }
  if (['complaint for cemetery', 'burial ground', 'crematorium', 'funeral', 'ശ്മശാനം', 'മഖ്ബറ', 'ദഹന ശാല'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ശ്മശാന ഭൂമി, ദഹന ശാല, ഖബർസ്ഥാൻ സൗകര്യ പ്രശ്നങ്ങൾ "Administrative / Others" കാറ്റഗറിയിൽ ഫയൽ ചെയ്യുക. ബന്ധപ്പെട്ട ഭരണ അധികാരിക്ക് MLA ഓഫീസ് വഴി ഇത് ഫോർവേഡ് ചെയ്യുന്നതാണ്.'
    : 'Issues related to cemeteries, crematoriums, or burial ground maintenance can be filed under "Administrative / Others". The MLA office will forward it to the concerned local authority.';
  }
  if (['complaint for fishing', 'fisherman problem', 'fish market', 'boat jetty', 'മത്സ്യബന്ധനം', 'മത്സ്യത്തൊഴിലാളി', 'ബോട്ട് ജെട്ടി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'മത്സ്യത്തൊഴിലാളി പ്രശ്നങ്ങൾ, ബോട്ട് ജെട്ടി, ഫിഷ് മാർക്കറ്റ് സൗകര്യ ദൗർലഭ്യം "Administrative / Others" കാറ്റഗറിയിൽ ഫയൽ ചെയ്‌ത് MLA-യുടെ ശ്രദ്ധയിൽ കൊണ്ടുവരാം.'
    : 'Fishermen welfare issues, boat jetty problems, or fish market facility shortages can be filed under "Administrative / Others" to bring it to the MLA\'s direct attention.';
  }
  if (['complaint for library', 'public library', 'reading room', 'ഗ്രന്ഥശാല', 'വായനശാല', 'ലൈബ്രറി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'പൊതു ഗ്രന്ഥശാല, വായനശാല, ഡിജിറ്റൽ ലൈബ്രറി സൗകര്യ പ്രശ്നങ്ങൾ "Education" അല്ലെങ്കിൽ "Administrative / Others" കാറ്റഗറിയിൽ ഫയൽ ചെയ്യുക.'
    : 'Public library, reading room, or digital library facility issues can be filed under the "Education" or "Administrative / Others" category on EnteMLA.';
  }
  if (['complaint for bus stop', 'bus shelter', 'waiting shed', 'ബസ് ഷെൽറ്റർ', 'കാത്തിരിപ്പ് കേന്ദ്രം', 'ബസ് സ്റ്റോപ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ബസ് ഷെൽറ്റർ, കാത്തിരിപ്പ് ഷെഡ് ദൗർലഭ്യം, ബസ് സ്റ്റോപ്പ് പ്രശ്നങ്ങൾ "Road / Transport" കാറ്റഗറിയിൽ ഫോട്ടോ ഉൾപ്പെടുത്തി ഫയൽ ചെയ്യുക.'
    : 'Missing bus shelters, damaged waiting sheds, or bus stop issues can be filed under the "Road / Transport" category. Attach photos to clearly show the condition.';
  }
  if (['how does entemla work', 'portal working', 'how portal works', 'entemla process', 'portal process', 'entemla എങ്ങനെ പ്രവർത്തിക്കുന്നു'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA ഇങ്ങനെ പ്രവർത്തിക്കുന്നു:\n1. പൗരൻ പരാതി ഫയൽ ചെയ്യുന്നു\n2. MLA ഓഫീസ് ടീം പരിശോധിക്കുന്നു\n3. ബന്ധപ്പെട്ട വകുപ്പിലേക്ക് ഫോർവേഡ് ചെയ്യുന്നു\n4. വകുപ്പ് നടപടി സ്വീകരിക്കുന്നു\n5. Status "Resolved" ആകുകയും SMS ലഭിക്കുകയും ചെയ്യുന്നു'
    : 'EnteMLA works as follows:\n1. Citizen files a complaint\n2. MLA office team reviews it\n3. Forwarded to the relevant department\n4. Department takes necessary action\n5. Status changes to "Resolved" and SMS is sent to citizen';
  }
  if (['can i file complaint for neighbor', 'complaint for others area', 'different house', 'neighbor problem', 'അയൽവാസി', 'അടുത്ത വീട്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'അതെ! നിങ്ങൾക്ക് അയൽക്കാർക്ക് വേണ്ടിയോ, അടുത്ത പ്രദേശത്തെ പ്രശ്നങ്ങൾക്ക് വേണ്ടിയോ പരാതി ഫയൽ ചെയ്യാം. Description-ൽ ബാധിക്കപ്പെട്ടവരുടെ കൃത്യമായ വിലാസം ഉൾപ്പെടുത്തുക.'
    : 'Yes! You can file a complaint on behalf of your neighbor or for issues in a nearby area. Make sure to include the exact address of the affected location in the description.';
  }
  if (['complaint for sports', 'playground facility', 'sports ground', 'stadium', 'സ്പോർട്സ്', 'കായിക സൗകര്യം', 'സ്റ്റേഡിയം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'കായിക സൗകര്യ ദൗർലഭ്യം, കളിക്കളം, സ്റ്റേഡിയം പ്രശ്നങ്ങൾ "Administrative / Others" കാറ്റഗറിയിൽ ഫയൽ ചെയ്‌ത് MLA-യ്ക്ക് ശ്രദ്ധയിൽ കൊണ്ടുവരാം.'
    : 'Lack of sports facilities, playground maintenance, or stadium issues can be reported under "Administrative / Others" to bring it to the MLA\'s attention for necessary action.';
  }
  if (['complaint for orphanage', 'old age home', 'destitute home', 'അനാഥാലയം', 'വൃദ്ധസദനം', 'ഭവനരഹിത കേന്ദ്രം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'അനാഥാലയം, വൃദ്ധ സദനം, ഭവനരഹിത കേന്ദ്രം എന്നിവയിലെ സൗകര്യ ദൗർലഭ്യം "Administrative / Others" അല്ലെങ്കിൽ "Health" കാറ്റഗറിയിൽ ഫയൽ ചെയ്യുക.'
    : 'Facility issues in orphanages, old age homes, or destitute homes can be filed under "Administrative / Others" or "Health" category on EnteMLA.';
  }
  if (['complaint for temple', 'mosque', 'church', 'religious place', 'ക്ഷേത്രം', 'മസ്ജിദ്', 'പള്ളി', 'ആരാധനാലയം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ആരാധനാലയങ്ങളുമായി ബന്ധപ്പെട്ട പൊതു സൗകര്യ പ്രശ്നങ്ങൾ (ഉദാ: ആക്സസ് റോഡ്, ശൗചാലയം) "Administrative / Others" കാറ്റഗറിയിൽ ഫയൽ ചെയ്യാം. മതപരമായ തർക്കങ്ങൾ EnteMLA-ൽ ഫയൽ ചെയ്യാൻ കഴിയില്ല.'
    : 'Civic issues related to religious places such as access roads or sanitation can be filed under "Administrative / Others". Religious disputes cannot be filed through EnteMLA.';
  }
  if (['can student use', 'student complaint', 'student file complaint', 'student portal', 'വിദ്യാർത്ഥി', 'സ്കൂൾ കുട്ടി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'കേരളത്തിലെ ഏത് പൗരനും EnteMLA ഉപയോഗിക്കാം. 18 വയസ്സ് തികഞ്ഞ വ്യക്തികൾക്ക് സ്വന്തമായി രജിസ്റ്റർ ചെയ്‌ത് പരാതി ഫയൽ ചെയ്യാം. 18 വയസ്സിൽ താഴെ ഉള്ളവർക്ക് രക്ഷിതാക്കളുടെ ഫോൺ നമ്പർ ഉപയോഗിക്കാം.'
    : 'Any citizen of Kerala can use EnteMLA. Individuals aged 18 and above can register independently. Those below 18 can use a parent or guardian\'s registered mobile number to file a complaint.';
  }
  if (['website link', 'entemla url', 'entemla website', 'portal link', 'entemla address', 'വെബ്സൈറ്റ് ലിങ്ക്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA പോർട്ടൽ ആക്സസ് ചെയ്യാൻ നിങ്ങളുടെ ബ്രൗസറിൽ EnteMLA-യുടെ ഔദ്യോഗിക വെബ്സൈറ്റ് തുറക്കുക. കൃത്യമായ URL-നായി "Contact Us" പേജ് അല്ലെങ്കിൽ ഔദ്യോഗിക സോഷ്യൽ മീഡിയ പേജ് നോക്കുക.'
    : 'To access the EnteMLA portal, open the official EnteMLA website in your browser. Check the "Contact Us" page or official social media pages for the exact URL.';
  }
  if (['social media', 'facebook', 'instagram', 'twitter', 'youtube', 'സോഷ്യൽ മീഡിയ', 'ഫേസ്ബുക്ക്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA-യുടെ ഏറ്റവും പുതിയ അപ്ഡേറ്റുകൾ, ഫീച്ചറുകൾ, അറിയിപ്പുകൾ ഔദ്യോഗിക സോഷ്യൽ മീഡിയ പേജുകൾ വഴി ലഭ്യമാണ്. "Contact Us" പേജ് വഴി ഔദ്യോഗിക ലിങ്കുകൾ കണ്ടെത്താം.'
    : 'Latest updates, new features, and announcements from EnteMLA are available on official social media pages. Visit the "Contact Us" page to find the official social media links.';
  }
  if (['complaint for canal', 'irrigation', 'water canal', 'canal block', 'കനാൽ', 'ജലസേചനം', 'തോട്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'കനാൽ, ജലസേചന തോട്, ഒഴുക്ക് തടസ്സം, കനാൽ അറ്റകുറ്റ പ്രശ്നങ്ങൾ "PWD" അല്ലെങ്കിൽ "KWA / Water" കാറ്റഗറിയിൽ ഫോട്ടോ ഉൾപ്പെടുത്തി ഫയൽ ചെയ്യുക.'
    : 'Canal blockage, irrigation channel issues, or water flow problems can be filed under "PWD" or "KWA / Water" category. Attach photos to help officials identify the exact location.';
  }
  if (['complaint for footpath', 'footpath damaged', 'pavement', 'walking path', 'ഫുട്പാത്ത്', 'നടപ്പാത', 'ഫുൾ പ്ലാത്ത്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഫുട്പാത്ത് തകർച്ച, നടപ്പാത ദൗർലഭ്യം, കൈയ്യേറ്റം എന്നിവ "PWD / Road" കാറ്റഗറിയിൽ ഫോട്ടോ ഉൾപ്പെടുത്തി ഫയൽ ചെയ്യുക. ഇത്തരം പ്രശ്നങ്ങൾ ദ്രുതഗതിയിൽ കൈകാര്യം ചെയ്യപ്പെടുന്നതാണ്.'
    : 'Damaged footpaths, missing pavements, or encroachments on walking paths can be filed under "PWD / Road" with photos. These complaints are typically addressed promptly.';
  }
  if (['how to register land complaint', 'land dispute', 'land problem', 'property dispute', 'ഭൂമി തർക്കം', 'ഭൂ പ്രശ്നം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഭൂമി തർക്കം, ഭൂ ക്രമക്കേട് എന്നിവ "Administrative / Others" കാറ്റഗറിയിൽ ഫയൽ ചെയ്‌ത് MLA-യ്ക്ക് ശ്രദ്ധയിൽ കൊണ്ടുവരാം. നിയമ പ്രശ്നങ്ങൾക്ക് Revenue Court അല്ലെങ്കിൽ Taluk ഓഫീസ് ബന്ധപ്പെടുക.'
    : 'Land disputes or property irregularities can be filed under "Administrative / Others" to bring it to the MLA\'s attention. For legal land issues, contact the Revenue Court or Taluk Office directly.';
  }
  if (['complaint for water tank', 'overhead tank', 'water storage', 'tank overflow', 'വാട്ടർ ടാങ്ക്', 'ജലസംഭരണി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഓവർഹെഡ് ടാങ്ക് തകർച്ച, ജലസംഭരണി പ്രശ്നങ്ങൾ, ടാങ്ക് ഓവർഫ്ലോ "KWA / Water Supply" കാറ്റഗറിയിൽ ഫോട്ടോ ഉൾപ്പെടുത്തി ഫയൽ ചെയ്യുക.'
    : 'Overhead tank damage, water storage issues, or tank overflow problems can be filed under "KWA / Water Supply" category. Include photos for faster identification and resolution.';
  }
  if (['complaint for noise pollution', 'loudspeaker', 'loud music', 'construction noise', 'ശബ്ദ മലിനീകരണം', 'ലൗഡ്സ്പീക്കർ', 'ഒച്ച ശല്യം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ലൗഡ്സ്പീക്കർ ശല്യം, നിർമ്മാണ ഒച്ച, ശബ്ദ മലിനീകരണം "Administrative / Others" കാറ്റഗറിയിൽ ഫോൺ നമ്പർ ഉൾപ്പെടുത്തി ഫയൽ ചെയ്യുക. ഉദ്യോഗസ്ഥർ ആവശ്യമെങ്കിൽ നേരിട്ട് ബന്ധപ്പെടും.'
    : 'Loudspeaker noise, construction disturbance, or sound pollution complaints can be filed under "Administrative / Others". Include your phone number so officials can contact you if needed.';
  }
  if (['how is entemla different', 'why use entemla', 'advantage of entemla', 'entemla benefit', 'entemla ഉപയോഗിക്കണം', 'entemla നല്ലത്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA ഉപയോഗിക്കുന്നതിന്റെ ഗുണങ്ങൾ:\n• MLA-യ്ക്ക് നേരിട്ട് പരാതി അറിയിക്കാം\n• 24/7 ലഭ്യം\n• Real-time Tracking\n• SMS അറിയിപ്പ്\n• ഡിജിറ്റൽ റെക്കോർഡ്\n• സൗജന്യം\n• ഫോൺ നമ്പർ മാത്രം മതി'
    : 'Key advantages of using EnteMLA:\n• Directly reach your MLA\n• Available 24/7\n• Real-time complaint tracking\n• SMS notifications at every step\n• Digital records maintained\n• Completely free to use\n• Only a mobile number needed to register';
  }
  if (['complaint for well', 'drinking well', 'public well', 'well contamination', 'കിണർ', 'കുടിവെള്ള കിണർ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'പൊതു കിണർ, കുടിവെള്ള കിണർ മലിനീകരണം, കിണർ അടഞ്ഞ അവസ്ഥ എന്നിവ "KWA / Water Supply" കാറ്റഗറിയിൽ ഫോട്ടോ ഉൾപ്പെടുത്തി ഫയൽ ചെയ്യുക.'
    : 'Public well contamination, blocked drinking water wells, or well maintenance issues can be filed under "KWA / Water Supply" category. Attach photos to support your complaint.';
  }
  if (['complaint for cemetery', 'burial', 'graveyard', 'ശ്മശാനം', 'കബർ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ശ്മശാന, ഖബർസ്ഥാൻ, ദഹന ശാല പ്രശ്നങ്ങൾ "Administrative / Others" കാറ്റഗറിയിൽ ഫയൽ ചെയ്യുക. MLA ഓഫീസ് ബന്ধപ്പെട്ട തദ്ദേശ ഭരണ സ്ഥാപനത്തിലേക്ക് ഫോർവേഡ് ചെയ്യും.'
    : 'Cemetery, graveyard, or crematorium maintenance issues can be filed under "Administrative / Others". The MLA office will forward it to the concerned local governing body.';
  }
  if (['what if i move', 'shifted house', 'changed address', 'new address', 'വിലാസം മാറി', 'പുതിയ വീട്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'വിലാസം മാറിയെങ്കിൽ ലോഗിൻ ചെയ്ത് "Profile Settings" വഴി പുതിയ വിലാസം അപ്ഡേറ്റ് ചെയ്യുക. ഇനി മുതൽ ഫയൽ ചെയ്യുന്ന പരാതികൾ പുതിയ മണ്ഡലത്തിലെ MLA-യ്ക്ക് ഫോർവേഡ് ചെയ്യും.'
    : 'If you have moved, update your new address through "Profile Settings" after logging in. Future complaints will be forwarded to the MLA of your new constituency automatically.';
  }
  if (['how to report open wire', 'hanging wire', 'electric wire', 'dangerous wire', 'കമ്പി ഞാത്തിക്കിടക്കുന്നു', 'ഇലക്ട്രിക് വയർ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'വീഴ്ചയ്ക്ക് സാധ്യതയുള്ള ഇലക്ട്രിക് വയർ, ഞാന്നു കിടക്കുന്ന കമ്പി "KSEB / Electricity" കാറ്റഗറിയിൽ ഫോട്ടോ ഉൾപ്പെടുത്തി ഉടൻ ഫയൽ ചെയ്യുക. അടിയന്തിരമായി KSEB-നെ 1912 ൽ ബന്ധപ്പെടുക.'
    : 'Dangling or broken electric wires must be reported immediately under "KSEB / Electricity" with photos. Also contact KSEB emergency helpline at 1912 for immediate safety action.';
  }
  if (['complaint for toxic waste', 'chemical waste', 'factory pollution', 'industrial waste', 'വ്യവസായ മാലിന്യം', 'ഫാക്ടറി മലിനീകരണം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഫാക്ടറി മലിനീകരണം, രാസ മാലിന്യ നിക്ഷേപം "Administrative / Others" കാറ്റഗറിയിൽ ഫോട്ടോ, വീഡിയോ തെളിവ് ഉൾപ്പെടുത്തി ഫയൽ ചെയ്യുക. Kerala Pollution Control Board-നെയും ബന്ധപ്പെടാം.'
    : 'Factory pollution or chemical waste dumping can be filed under "Administrative / Others" with photo and video evidence. You may also contact the Kerala Pollution Control Board for parallel action.';
  }
  if (['complaint for footover bridge', 'over bridge', 'pedestrian bridge', 'foot over bridge', 'കാൽനട പാലം', 'ഫുട്ഓവർ ബ്രിഡ്ജ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഫുട്ഓവർ ബ്രിഡ്ജ്, കാൽനട പാലം ദൗർലഭ്യം, തകർന്ന അവസ്ഥ "PWD / Road" കാറ്റഗറിയിൽ ഫോട്ടോ ഉൾപ്പെടുത്തി ഫയൽ ചെയ്യുക.'
    : 'Missing or damaged foot over bridges or pedestrian bridges can be filed under "PWD / Road" category with supporting photos for faster official attention.';
  }
  if (['tribal', 'adivasi', 'sc st complaint', 'scheduled caste', 'scheduled tribe', 'ആദിവാസി', 'പട്ടികജാതി', 'പട്ടികവർഗ്ഗം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'SC/ST, ആദിവാസി ക്ഷേമ പ്രശ്നങ്ങൾ "Administrative / Others" കാറ്റഗറിയിൽ ഫയൽ ചെയ്‌ത് MLA-യ്ക്ക് ശ്രദ്ധയിൽ കൊണ്ടുവരാം. SC/ST Welfare Department-ന്റെ ഓഫീസിലും ബന്ധപ്പെടാം.'
    : 'SC/ST or tribal welfare issues can be filed under "Administrative / Others" to bring it to the MLA\'s attention. You may also contact the SC/ST Welfare Department office directly for parallel support.';
  }
  if (['complaint for pollution in river', 'river pollution', 'lake pollution', 'water pollution', 'നദി മലിനീകരണം', 'കായൽ', 'ജല മലിനീകരണം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'നദി, കായൽ, തണ്ണീർത്തട മലിനീकรणം "Administrative / Others" കാറ്റഗറിയിൽ ഫോട്ടോ, സ്ഥല വിവരങ്ങൾ സഹിതം ഫയൽ ചെയ്യുക. Kerala Pollution Control Board-നെയും ബന്ധപ്പെടാം.'
    : 'River, lake, or wetland pollution complaints can be filed under "Administrative / Others" with photos and location details. You may also report to the Kerala Pollution Control Board simultaneously.';
  }
  if (['can i see other complaints', 'view all complaints', 'public complaints', 'others complaint', 'മറ്റുള്ളവരുടെ പരാതി', 'പൊതു പരാതി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഇല്ല. EnteMLA-ൽ ഓരോ യൂസർക്കും സ്വന്തം പരാതികൾ മാത്രം കാണാൻ കഴിയും. മറ്റ് പൗരന്മാരുടെ പരാതികൾ കാണൽ സ്വകാര്യത ലംഘനം ആകുന്നതിനാൽ ഇത് അനുവദനീയമല്ല.'
    : 'No. Each user can only view their own complaints on EnteMLA. Viewing other citizens\' complaints is not permitted as it would violate their privacy and data protection rights.';
  }
  if (['what is mla fund', 'mla lad fund', 'mla development fund', 'lad fund', 'MLA ഫണ്ട്', 'വികസന ഫണ്ട്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'MLA Local Area Development (LAD) Fund ഓരോ MLA-യ്ക്കും മണ്ഡലത്തിലെ വികസന പ്രവർത്തനങ്ങൾക്കായി സർക്കാർ നൽകുന്ന ഫണ്ട് ആണ്. EnteMLA-ൽ ഫയൽ ചെയ്യുന്ന പ്രശ്നങ്ങൾ ഈ ഫണ്ട് ഉപയോഗിക്കേണ്ട ഇടങ്ങൾ MLA-യ്ക്ക് തിരിച്ചറിയാൻ സഹായിക്കുന്നു.'
    : 'The MLA Local Area Development (LAD) Fund is government money allocated to each MLA for local development. Complaints filed on EnteMLA help the MLA identify where this fund should be prioritized and utilized.';
  }
  if (['what happens if complaint is spam', 'spam complaint', 'irrelevant complaint', 'complaint misuse', 'spam parathi', 'വ്യാജ പരാതി ഫലം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'Spam അല്ലെങ്കിൽ അപ്രസക്തമായ പരാതി MLA ഓഫീസ് "Rejected" ആക്കും. ആവർത്തിച്ചുള്ള Spam പരാതികൾ അക്കൗണ്ട് സസ്പെൻഷനിലേക്ക് നയിക്കാം. EnteMLA ഉദ്ദേശ്യ ഉദ്ദേശ്യത്തിനു മാത്രം ഉപയോഗിക്കുക.'
    : 'Spam or irrelevant complaints will be marked "Rejected" by the MLA office. Repeated spam submissions may lead to account suspension. Please use EnteMLA only for genuine civic issues.';
  }
  if (['complaint for footpath encroachment', 'shop encroachment', 'vendor blocking road', 'hawker', 'കട കൈയ്യേറ്റം', 'തെരുവ് കച്ചവടക്കാർ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'കട കൈയ്യേറ്റം, തെരുവ് കച്ചവടക്കാർ വഴി തടസ്സം ഉണ്ടാക്കൽ "Administrative / Others" കാറ്റഗറിയിൽ ഫോട്ടോ ഉൾപ്പെടുത്തി ഫയൽ ചെയ്യുക.'
    : 'Shop encroachments on footpaths or street vendors blocking public roads can be filed under "Administrative / Others" with photos. Officials will take necessary action after verification.';
  }
  if (['complaint for wifi', 'broadband issue', 'internet in panchayat', 'public wifi', 'പൊതു wifi', 'ഇന്റർനെറ്റ് ദൗർലഭ്യം'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'പഞ്ചായത്ത്, പൊതു ഇടം, ഗ്രാമ പ്രദേശത്തെ ഇന്റർനെറ്റ് ദൗർലഭ്യം "Administrative / Others" കാറ്റഗറിയിൽ ഫയൽ ചെയ്‌ത് MLA-യ്ക്ക് ശ്രദ്ധയിൽ കൊണ്ടുവരാം.'
    : 'Lack of internet connectivity in panchayats, public areas, or rural regions can be filed under "Administrative / Others" to bring it to the MLA\'s attention for infrastructure improvement.';
  }
  if (['complaint for pipeline', 'gas pipeline', 'lpg supply', 'gas leakage', 'പൈപ്പ്ലൈൻ', 'ഗ്യാസ് ലീക്ക്', 'lpg'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഗ്യാസ് ലീക്ക് ഉണ്ടെങ്കിൽ ഉടൻ ഗ്യാസ് കണക്ഷൻ അടക്കുക. LPG ഹെൽപ്ലൈൻ 1906 ൽ ബന്ധപ്പെടുക. പൈപ്പ്ലൈൻ, ഗ്യാസ് വിതരണ ക്രമക്കേടുകൾ "Administrative / Others" കാറ്റഗറിയിൽ ഫയൽ ചെയ്യാം.'
    : 'For gas leaks, immediately shut the connection and call the LPG helpline at 1906. Pipeline or gas supply irregularities can be reported under "Administrative / Others" on EnteMLA.';
  }
  if (['complaint for disability', 'wheelchair access', 'ramp', 'disabled facility', 'ഭിന്നശേഷി', 'വ്യീൽചെയർ', 'റാമ്പ്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ഭിന്നശേഷി സൗഹൃദ റാമ്പ്, ടോയ്‌ലറ്റ്, വ്യീൽചെയർ ആക്സസ് ദൗർലഭ്യം "Administrative / Others" അല്ലെങ്കിൽ "Health" കാറ്റഗറിയിൽ ഫയൽ ചെയ്‌ത് MLA-യ്ക്ക് ശ്രദ്ധയിൽ കൊണ്ടുവരാം.'
    : 'Lack of disability-friendly ramps, toilets, or wheelchair access in public places can be filed under "Administrative / Others" or "Health" category on EnteMLA for necessary action.';
  }
  if (['is entemla secure','private','portal security', 'data breach', 'hacker', 'portal safe', 'EnteMLA സുരക്ഷ', 'ഡേറ്റ സുരക്ഷ'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA ഉപയോക്തൃ ഡേറ്റ സുരക്ഷിതമായി SSL Encryption ഉപയോഗിച്ച് സൂക്ഷിക്കുന്നു. OTP വെരിഫിക്കേഷൻ, Secure Login, Data Privacy Policy എന്നിവ ഉറപ്പ് വരുത്തുന്നു. നിങ്ങളുടെ വ്യക്തിഗത വിവരം ഒരിക്കലും മൂന്നാം കക്ഷിക്ക് നൽകില്ല.'
    : 'EnteMLA secures user data using SSL encryption. OTP verification, secure login, and a strict Data Privacy Policy ensure your information is protected. Personal data is never shared with any third party.';
  }
  if (['complaint for ambulance', 'emergency vehicle', 'ambulance road', '108', 'ആംബുലൻസ്', 'ആപത്ത്'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'ആംബുലൻസ് / അടിയന്തിര വാഹന ഗതാഗതം തടസ്സപ്പെടുന്ന റോഡ് പ്രശ്നങ്ങൾ "PWD / Road" കാറ്റഗറിയിൽ ഉടൻ ഫയൽ ചെയ്യുക. അടിയന്തിര ആംബുലൻസ് സഹായത്തിന് 108 ൽ വിളിക്കുക.'
    : 'Road issues blocking ambulance or emergency vehicle movement must be filed urgently under "PWD / Road". For emergency ambulance assistance, call 108 immediately.';
  }
  if (['how many times can i track', 'track limit', 'tracking limit', 'tracking attempts', 'ട്രാക്ക് ലിമിറ്റ്', 'ട്രാക്കിംഗ് പരിധി'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA-ൽ ട്രാക്കിംഗ് ചെക്ക് ചെയ്യുന്നതിന് ഒരു പരിധിയുമില്ല. Tracking ID ഉപയോഗിച്ച് ഏത് സമയത്തും, എത്ര തവണ വേണമെങ്കിലും പരാതിയുടെ സ്ഥിതി ചെക്ക് ചെയ്യാം.'
    : 'There is no limit on how many times you can track your complaint. Use your Tracking ID to check the status as many times as you want, at any time of the day.';
  }
  if (['what is the vision of entemla', 'entemla goal', 'entemla mission', 'purpose of entemla', 'entemla ലക്ഷ്യം', 'entemla vision'].some(w => q.includes(w))) {return lang === 'Malayalam'
    ? 'EnteMLA-യുടെ ലക്ഷ്യം: കേരളത്തിലെ ഓരോ പൗരനും അവരുടെ MLA-യുമായി ഡിജിറ്റലായി ബന്ധപ്പെടാൻ കഴിയുന്ന, സുതാര്യവും ഫലപ്രദവുമായ ഒരു ഭരണ സംവിധാനം ഉണ്ടാക്കുക.'
    : 'EnteMLA\'s mission is to create a transparent and effective governance system where every citizen of Kerala can digitally connect with their MLA, ensuring faster resolution of local civic issues.';
  }
  return lang === 'Malayalam'
      ? 'ക്ഷമിക്കണം, ആ ചോദ്യം മനസ്സിലായില്ല. ദയവായി മറ്റൊരു രീതിയിൽ ചോദിക്കൂ.': 'Sorry, I could not understand your question. Please try asking differently.';
  }
}
