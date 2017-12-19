#!/usr/bin/perl

use strict;
use warnings;

open my $out, ">", "louvre.json";

while (my $row = <>) {
	#chomp $row;
	$row =~ s/DUAL.*BODY\-.\-solid1/Trainer body/g;
	$row =~ s/DUAL.*AXIS\-.\-solid1/Axis screw/g;
	$row =~ s/Axis screw/Axis/g;
	$row =~ s/DUAL.*GLASS.*GASKET\-.\-solid1/Glazing louvre gasket/g;
	$row =~ s/DUAL.*GASKET\-.\-solid1/Rebate gasket/g;
	$row =~ s/DUAL.*BEARER.*solid1/Aluminium profile/g;
	$row =~ s/DUAL.*GLASS.*solid1/6mm glazing/g;
	$row =~ s/"transparent.*true\,//g;
	$row =~ s/opacity.*3/opacity\"\: 0\.3\, \"transparent\":true/g;
	print {$out} $row;
}
