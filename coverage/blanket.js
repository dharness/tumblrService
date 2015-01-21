/**
 * Copyright Digital Engagement Xperience 2014
 * Created by Andrew
 *
 */

require('blanket')({
    // skip all files in node_modules and test from instrumentation
    pattern: /^(?!.*(node_modules|test).*$)/
});