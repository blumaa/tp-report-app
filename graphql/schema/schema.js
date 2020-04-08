const graphql = require("graphql");
const _ = require("lodash");
const Place = require("../../models/place");
const Report = require("../../models/Report");

import {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime
} from 'graphql-iso-date';

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
} = graphql;


// define the objects

const TermType = new GraphQLObjectType({
  name: "Term",
  fields: () => ({
    id: { type: GraphQLID },
    location: { type: GraphQLString },
  }),
});

const PlaceType = new GraphQLObjectType({
  name: "Place",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    googleId: { type: GraphQLString },
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat },
    inStock: { type: GraphQLBoolean },
    reports: {
      type: new GraphQLList(ReportType),
      resolve(parent, args) {
        // return _.filter(reports, { googleId: parent.googleId });
        return Report.find({ googleId: parent.googleId });
      },
    },
  }),
});

const ReportType = new GraphQLObjectType({
  name: "Report",
  fields: () => ({
    id: { type: GraphQLID },
    placeName: { type: GraphQLString },
    itemName: { type: GraphQLString },
    status: { type: GraphQLString },
    placeId: { type: GraphQLString },
    googleId: { type: GraphQLString },
    dateTime: {type: GraphQLDateTime},
    place: {
      type: PlaceType,
      resolve(parent, args) {
        // console.log(parent);
        // return _.find(places, { googleId: parent.googleId });
        // return Place.findById(parent.placeId);
        return Place.findOne({ googleId: parent.googleId });
      },
    },
  }),
});

// define queries and mutations

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    term: {
      // this will be used to collect user search data
      type: TermType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db / other source
        // console.log(typeof args.id);
        // return _.find(terms, { id: args.id });
      },
    },
    place: {
      type: PlaceType,
      args: { googleId: { type: GraphQLString }, id: { type: GraphQLID } },
      resolve(parent, args) {
        // console.log(args.googleId);
        // return _.find(places, { googleId: args.googleId });
        const place = Place.findOne({ googleId: args.googleId });
        if (place) {
          // console.log(place)
          return place;
        }
        // return {status: "success", place}
      },
    },
    places: {
      type: new GraphQLList(PlaceType),
      args: { lat: { type: GraphQLInt }, lng: { type: GraphQLInt } },
      async resolve(parent, args) {
        // return _.filter(places, { lat: args.lat, lng: args.lng });
        try {
          const places = await Place.find({})
          return places
        } catch (error) {
          throw error
        }
        // is this where I want to fetch on the backend?
        // return Place.find({});
      },
    },
    report: {
      type: ReportType,
      args: {
        id: { type: GraphQLID },
        googleId: { type: GraphQLString },
        status: { type: GraphQLString },
      },
      resolve(parent, args) {
        // return _.find(reports, { id: args.id });
        return Report.findById(args.id);
      },
    },
    reports: {
      type: new GraphQLList(ReportType),
      resolve(parent, args) {
        // return reports
        return Report.find({});
      },
    },
  },
});

// mutations

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPlace: {
      type: PlaceType,
      args: {
        name: { type: GraphQLString },
        googleId: { type: GraphQLString },
        lat: { type: GraphQLFloat },
        lng: { type: GraphQLFloat },
        inStock: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        let place = new Place({
          name: args.name,
          googleId: args.googleId,
          lat: args.lat,
          lng: args.lng,
          inStock: args.inStock,
        });
        return place.save();
      },
    },
    addReport: {
      type: ReportType,
      args: {
        itemName: { type: GraphQLString },
        placeName: { type: GraphQLString },
        status: { type: GraphQLString },
        placeId: { type: GraphQLString },
        googleId: { type: GraphQLString },
        dateTime: { type: GraphQLDateTime },
        // googleId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {

        // console.log(typeof args.googleId, args.googleId);
        console.log('placeName', args.placeName)
        console.log('args.dateTime', args.dateTime)
        
        // search for already existing place
        const place = Place.findOne({ googleId: args.googleId }, (err, result)=> {
          console.log('found place', result)
          if (!result) {
            console.log('creating new place')
            let newPlace = new Place({
              name: args.placeName,
              googleId: args.googleId,
            });
            newPlace.save();
          }
        });
       //return new place and new report

        let report = new Report({
          itemName: "toilet paper",
          googleId: args.googleId,
          status: args.status,
          dateTime: new Date().toISOString()
        });
        return report.save();
      },
    },
  },
});

//export the rootquery

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
