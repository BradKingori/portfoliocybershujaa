**Incident Report: Operation Carnage** **PCAP** **Network Intrusion Analysis**

**Analyst:** Bradley King’ori

**Date:** 16/08/2025

**Classification:** Incident Report on the Cobalt Strike Kill Chain.

**Source Material:** TryHackMe "Carnage" Room ( [https://tryhackme.com/room/c2carnage](https://tryhackme.com/room/c2carnage) )

**1. Executive Summary**

We are presented with a user Eric has been subjected to a phishing email leading to a compromised workstation the multi-stage intrusion began with the download of a malicious ZIP archive from an external server (attirenepal.com), followed by a burst of TLS connections to three additional external domains (finejewels.com.au, thietbiagt.com, new.americold.com) used to stage further malicious files, then check-in traffic to a first-stage command-and-control (C2) domain, and culminating in the deployment of two Cobalt Strike C2 request. These Cobalt Strike IP addresses used during this session were independently confirmed as known C2 infrastructure via VirusTotal community intelligence.This workstation represents a full macro-to-C2 compromise chain and,if left unmitigated, would have given the attacker persistent remote access to the host.

**2. Scope & Objective**

- **Data source analyzed:** carnage.pcap
- **Tools used:** Wireshark (Follow TCP Stream, Conversations, TLS/HTTP filters), VirusTotal Community
- **Objective:** Identify the delivery mechanism, first-stage C2 channel, and Cobalt Strike infrastructure used in the intrusion, extract IOCs, map behavior to MITRE ATT&CK.

**3. Timeline of Events**

|                                |                                                                                                                     |                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| \| Timestamp (UTC)             | Event                                                                                                               | Evidence                                             |
| 2021-09-24 16:44:38            | First HTTP connection to malicious host attirenepal.com (85.187.128.24)                                             | Packet 1735                                          |
| 2021-09-24 16:44:38            | GET /incidunt-consequatur/documents.zip issued                                                                      | HTTP request, stream 73                              |
| 2021-09-24 16:44:41            | Server responds 200 OK, delivers documents.zip (contains chart-1530076591.xls)                                      | Packet 2173                                          |
| 2021-09-24 16:45:11 – 16:45:12 | TLS session with finejewels.com.au — additional malicious file download                                             | TLS Client Hello / Cert exchange                     |
| 2021-09-24 16:45:21 – 16:45:22 | TLS session with thietbiagt.com — additional malicious file download                                                | TLS Client Hello / App Data                          |
| 2021-09-24 16:45:25 – 16:45:26 | TLS session with new.americold.com — additional malicious file download                                             | TLS Client Hello / App Data                          |
| 2021-09-24 16:46:16            | First POST check to first-stage C2 domain maldivehost.net (208.91.128.6)                                            | Packet 3822, 281 bytes                               |
| 2021-09-24 16:46:16 – 16:57:15 | Recurring POST check-ins to maldivehost.net using URI pattern /zLIisQRWZI9/<base64 blob>                            | Multiple packets, http.request.method == POST filter |
| 2021-09-24 16:55:05 – 16:55:19 | TLS sessions established with Cobalt Strike server #2, securitybusinpuff.com (185.125.204.174:8080)                 | Stream analysis, ip.addr == 185.125.204.174          |
| 2021-09-24 16:55:08            | TLS session with Cobalt Strike server #1, survmeter.live (185.106.96.158), Host header spoofed as ocsp.verisign.com | Stream 163                                           |

Table 1:Timeline of events

**4. Technical Findings**

**4.1 Initial Access / Delivery**

The victim host retrieved a ZIP archive from an external server:

Command : http

![](file:///C:/Users/BradKing/AppData/Local/Temp/msohtmlclip1/01/clip_image002.png)Figure 1:Initial Time of Compromise

![](file:///C:/Users/BradKing/AppData/Local/Temp/msohtmlclip1/01/clip_image004.png)Figure 2:Payload details

GET /incidunt-consequatur/documents.zip HTTP/1.1

**Command : Follow TCP stream**

**![](file:///C:/Users/BradKing/AppData/Local/Temp/msohtmlclip1/01/clip_image006.png)**

Figure 3: Follow TCP Upstream delivers Server Details

Host: attirenepal.com 

Server: LiteSpeed

x-powered-by: PHP/7.2.34

content-disposition: attachment; filename=documents.zip

The zip contained a single file: **chart-1530076591.xls**, visible in the raw stream as a ZIP local file header (PK....chart-1530076591.xls). (Appendix Fig 4) which is consistent with a malicious document-based initial access technique.

**4.2 First-Stage C2 Channel**

Shortly after the document was retrieved, the host began issuing regular HTTP POST requests to **maldivehost.net** (208.91.128.6):

http.request.method == " POST "

**Command : Follow TCP stream**

POST /zLIisQRWZI9/OQsaDixzHTgtfjMcGypGenpldWF5eWV9f3k= HTTP/1.1

![](file:///C:/Users/BradKing/AppData/Local/Temp/msohtmlclip1/01/clip_image008.png)Figure 4:RESFUL Post  query

- First  packet check of length: **281 bytes**
- It created a post request with path prefix zLIisQRWZI9 remaining constant across dozens of these requests over an 12-minute window , consistent with a shell script used for periodic C2 check-ins

![](file:///C:/Users/BradKing/AppData/Local/Temp/msohtmlclip1/01/clip_image010.png)Figure 5:Packet details for the POST query

![](file:///C:/Users/BradKing/AppData/Local/Temp/msohtmlclip1/01/clip_image012.png)

**4.3 Cobalt Strike Deployment**

Traffic pivoted to two additional external hosts, both later confirmed via VirusTotal community annotations as active **Cobalt Strike C2 servers**:

![](file:///C:/Users/BradKing/AppData/Local/Temp/msohtmlclip1/01/clip_image014.png)Figure 6Verisgn Community verification of Cobalt Strike Servers

|                 |                       |                                        |
| --------------- | --------------------- | -------------------------------------- |
| IP Address      | Domain                | Virus Total Confirmation               |
| 185.106.96.158  | survmeter.live        | Cobalt Strike infrastructure           |
| 185.125.204.174 | securitybusinpuff.com | Confirmed C2 @ ports 80 & 8080 (HTTPS) |

Table 2:Cobalt Strike Virus Total Confirmation

**Evasion technique observed:** Connections to 185.106.96.158 were sent with the HTTP Host header set to ocsp.verisign.com a legitimate certificate-authority domain despite the underlying TCP connection going directly to the attacker-controlled IP. This is an obfuscating technique intended to make the scans look like routine OCSP certificate-validation traffic to a defender skimming logs.

**4.4 Secondary Malicious File Downloads**

In the roughly 90 seconds immediately following the documents.zip retrieval and before the first command fired, the host established TLS connections to three additional external domains confirmed as involved in malicious file download activity:

Command : tls

Followed by a follow up tcp stream![](file:///C:/Users/BradKing/AppData/Local/Temp/msohtmlclip1/01/clip_image016.png)Figure 7:Conducted a tls search to reveal host certificates

- finejewels.com.au @16:45:11
- thietbiagt.com @16:45:21
- new.americold.com @16:45:25

![](file:///C:/Users/BradKing/AppData/Local/Temp/msohtmlclip1/01/clip_image018.png)Figure 8:OSCP host certificate owner

The certificate presented during the finejewels.com.au handshake was issued by **GoDaddy\*\***.com\*\* likely a legitimate, compromised domain being abused to serve additional payload components rather than host the attacker owns outright. This staged, multi-domain download pattern occurring within a single instance is consistent with a threat actor pulling down supporting configuration module before initiating an attack.

**4.\*\***5\*\* **Workstation I.P Scanning**

Immediately after the malware attempted to identify which machine it had compromised by performing a DNS query

command:Dns

_followed by a follow UDP stream_![](file:///C:/Users/BradKing/AppData/Local/Temp/msohtmlclip1/01/clip_image019.png)Figure 9:A screenshot showcasing the dns search commands used to identify the workstation

Used to identify that api.ipify.org was used to query the machine.After this stage the malware then attempted to compromise the machine further by sending itself spam. Identified by using SMTP command to check details of each from user

Command: frame contains “MAIL FROM” ![](file:///C:/Users/BradKing/AppData/Local/Temp/msohtmlclip1/01/clip_image021.png)Figure 10:SMTP command to identifier sender of spam

Identifies [farshin@mailfa.com](mailto:farshin@mailfa.com)  as the source domain to get all information  from with SMTP conversation statistics show one session to 185.125.204.174:8080 alone accounted for 1439 packets of traffic the largest packet transfer indicating this was the primary active channel.

**5. Indicators of Compromise (IOCs)**

|                    |                       |                                                 |
| ------------------ | --------------------- | ----------------------------------------------- |
| Type               | Indicator             | Context                                         |
| Domain             | attirenepal.com       | Initial malicious document host                 |
| IP                 | 85.187.128.24         | Resolves attirenepal.com                        |
| File               | documents.zip         | Delivered archive                               |
| File               | chart-1530076591.xls  | Payload inside archive                          |
| Web server         | LiteSpeed             | Server header on attirenepal.com response       |
| Web server version | PHP/7.2.34            | x-powered-by header on attirenepal.com response |
| Domain             | finejewels.com.au     | Secondary malicious file download (TLS)         |
| Domain             | thietbiagt.com        | Secondary malicious file download (TLS)         |
| Domain             | new.americold.com     | Secondary malicious file download (TLS)         |
| Domain             | maldivehost.net       | First-stage/loader C2                           |
| IP                 | 208.91.128.6          | Resolves maldivehost.net                        |
| URI pattern        | /zLIisQRWZI9/<data>   | Loader restful api path                         |
| Domain             | survmeter.live        | Cobalt Strike C2 #1                             |
| IP                 | 185.106.96.158        | Cobalt Strike C2 #1                             |
| Domain             | securitybusinpuff.com | Cobalt Strike C2 #2                             |
| IP                 | 185.125.204.174       | Cobalt Strike C2 #2 (ports 8080 and port 80     |
| Spoofed Host       | ocsp.verisign.com     | Used against C2 #1 for traffic blending         |

Table 3:System Indicators of Compromise

**6. MITRE ATT&CK Mapping**

|                     |                                                                        |                   |                                             |
| ------------------- | ---------------------------------------------------------------------- | ----------------- | ------------------------------------------- |
| Tactic              | Technique                                                              | ID                | Evidence                                    |
| Execution           | User Execution: Malicious File (pending confirmation of macro content) | T1204.002         | chart-1530076591.xls extracted from archive |
| Command and Control | Application Layer Protocol: Web Protocols                              | T1071.001         | HTTP POST call to maldivehost.net           |
| Command and Control | Application Layer Protocol: Web Protocols (encrypted)                  | T1071.001 / T1573 | HTTPS request to both Cobalt Strike IPs     |
| Defense Evasion     | Masquerading                                                           | T1036.005         | Host header spoofed as ocsp.verisign.com    |
| Command and Control | Ingress Tool Transfer                                                  | T1105             | Download of documents.zip payload           |

Table 4Mitre Att&k Mapping Technique

**7. Impact Assessment**

The identification of live, confirmed Cobalt Strike traffic indicates that the attacker had created an active command channel to the host. Cobalt Strike is often employed for post-exploitation activities, including credential harvesting, lateral movement, and the staging of ransomware or additional payloads. The 12-minute delay between the initial execution of the document and the full Cobalt Strike suggests a swift, likely automated staging chain instead of manual hands-on-keyboard actions at this point in the capture.

**8. Recommendations**

1. **Immediate:** Immediately block all identified C2 IPs/domains (185.106.96.158, 185.125.204.174, maldivehost.net, attirenepal.com, finejewels.com.au, thietbiagt.com, new.americold.com) at the perimeter firewall and DNS resolver.
2. **Short-term:** Alert on HTTP requests where the Host header does not match the IP's identity
3. **Long-term:** Restrict execution of macros in Office documents originating from the internet, and sandbox all attachments containing Macro Office files before delivery to end users.Mandatory training on unsolicited document downloads from unknown sources.

**9. Conclusion**

This capture documents a complete macro email loader-to-Cobalt-Strike compromise chain in a working environment with the payload being delivered via email ZIP archive(a standard phishing attack), a first-stage HTTP request is set up to establish a foothold within the company,followed by an attempt to perform a C2 infrastructure strike by using deliberate traffic masking techniques i.e a spoofed Host headers. The nature of the APT was substantiated via VirusTotal community intelligence, thereby giving high confidence in the IOCs identified above.

**Appendix**

This report was produced as part of the TryHackMe "Carnage" room in the SOC Level 1 learning path, for Bradley King'ori to demonstrate my assessment of a Inciden. Listed below are diagrams that demonstrate the step by step of the actual challenge from the beginning

![](file:///C:/Users/BradKing/AppData/Local/Temp/msohtmlclip1/01/clip_image023.png)Figure 11Notice of Completion of Challenge Carnage by Brad.Kingori
